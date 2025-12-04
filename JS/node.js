// Author: AG
// Created: 9/4/25
// Description: Node.js backend server that receives core values from frontend,
// generates traits using Gemini API, then sends the traits to PHP to store in MySQL.

//Dependencies
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); 

// Validate required environment variables at startup
if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

const express = require('express'); 
const axios = require('axios');     
const cors = require('cors');       

const { GoogleGenerativeAI } = require("@google/generative-ai");
// SDK import for using Gemini models directly through Google's Generative AI package

// Express Setup
const app = express();

// Request size limits to prevent memory exhaustion attacks
app.use(express.json({ limit: '1mb' }));

// CORS configuration - TEMPORARILY OPEN FOR DEVELOPMENT
// TODO: Restrict this before production launch
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'http://34.69.23.109',
      'http://34.69.23.109:80',
      // Add your production domain here: 'https://yourdomain.com'
    ]
  : null; // null = allow all origins in development

app.use(cors({
  origin: function(origin, callback) {
    // In development, allow all origins
    if (!allowedOrigins) {
      return callback(null, true);
    }
    // In production, check whitelist
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//  Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rate limiting for regeneration - tracks requests per orderID
const regenerationTracker = new Map(); // orderID -> { count, resetTime }
const REGEN_LIMIT = 1; // Max regenerations per order per hour
const REGEN_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRegenerationLimit(orderID) {
  const now = Date.now();
  const key = `order_${orderID}`;
  
  if (!regenerationTracker.has(key)) {
    regenerationTracker.set(key, { count: 1, resetTime: now + REGEN_WINDOW });
    return { allowed: true, remaining: REGEN_LIMIT - 1 };
  }
  
  const tracker = regenerationTracker.get(key);
  
  // Reset if window expired
  if (now > tracker.resetTime) {
    regenerationTracker.set(key, { count: 1, resetTime: now + REGEN_WINDOW });
    return { allowed: true, remaining: REGEN_LIMIT - 1 };
  }
  
  // Check if limit exceeded
  if (tracker.count >= REGEN_LIMIT) {
    const minutesLeft = Math.ceil((tracker.resetTime - now) / 60000);
    return { 
      allowed: false, 
      remaining: 0,
      resetIn: minutesLeft
    };
  }
  
  // Increment count
  tracker.count++;
  return { allowed: true, remaining: REGEN_LIMIT - tracker.count };
}

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running.'); // quick check route
});

// ==================== FUNCTION: generateTraits ====================
// Purpose: Calls Gemini text API to generate 6 trait pairs from core values
// Input: coreValues (string)
// Output: Raw Gemini response text containing JSON array
// =================================================================
async function generateTraits(coreValues) {
  // Gemini prompt 
  // This is the text instruction given to Gemini to produce personality traits,
  // each with two contrasting attributes and assigned colors.
  const prompt = `
Identify at least six key pairs of attributes that compare and contrast the duality of these two themes: "${coreValues}". Write in a warm, conversational tone directly addressing the person exploring these themes. Provide a short and long description of each pairing and how it relates specifically to the themes "${coreValues}" through duality. Focus on the universal meanings of these themes without making assumptions about the person's past or creating fictional backstories. Use these colors only: Clear Black White Red Blue Green Yellow Grey Brown Purple Pink Orange Gold Silver.

IMPORTANT: Do not use special characters like apostrophes, quotes, em dashes, or smart quotes in your descriptions. Use only plain text with simple punctuation (periods, commas, hyphens).

Return the response as a single JSON array of objects.
Each object in the array should have the following structure:
{
  "color_1": "string",
  "color_2": "string",
  "attribute_1": "string",
  "attribute_2": "string",
  "short_description": "string",
  "long_description": "string"
}
`;

  try {
    // Call the Gemini API using axios — here we're using the "text generation" model (gemini-2.0-flash)
    // It returns a conversational, structured JSON output describing six pairs of traits.
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Extract the raw text content from Gemini's response
    const geminiResponseText = response.data.candidates[0].content.parts[0].text;
    return geminiResponseText;

  } catch (error) {
    // Throw if Gemini fails
    throw new Error("Failed to call Gemini API");
  }
}
// ==================== END: generateTraits ====================


// ==================== SHARED UTILITY FUNCTIONS ====================---------- FUNCTION: parseGeminiJSON ----------
// Purpose: Extract and parse JSON array from Gemini response text
// Input: rawResponse (string) - raw text from Gemini API
// Output: Parsed JavaScript array of trait objects
// -----------------------------------------------
function parseGeminiJSON(rawResponse) {
  const match = rawResponse.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error("No valid JSON array found in Gemini response");
  }
  const jsonString = match[0];
  return JSON.parse(jsonString);
}
// ---------- END: parseGeminiJSON ----------

// ---------- FUNCTION: createImageDirectories ----------
// Purpose: Create directory structure for storing order images
// Input: orderID (number) - unique order identifier
// Output: { baseDir, orderDir } - paths to created directories
// ------------------------------------------------------
function createImageDirectories(orderID) {
  const fs = require("fs");
  const path = require("path");
  const baseDir = path.join(__dirname, "Generated_Images");
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
  
  const orderDir = path.join(baseDir, `Order_${orderID}`);
  if (!fs.existsSync(orderDir)) fs.mkdirSync(orderDir, { recursive: true });
  
  return { baseDir, orderDir };
}
// ---------- END: createImageDirectories ----------

// ---------- FUNCTION: generateAllImages ----------
// Purpose: Generate all 6 animal images for traits using Gemini image API
// Input: traits (array) - 6 trait objects with attributes and colors
//        orderID (number) - order identifier for file storage
// Output: Array of generated image objects with paths and base64 data
// -------------------------------------------------
async function generateAllImages(traits, orderID) {
  const fs = require("fs");
  const path = require("path");
  const { orderDir } = createImageDirectories(orderID);
  const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const imageModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
  
  // Step 1: Ask Gemini text model to choose 6 unique animals
  const animalSelectionPrompt = `Choose exactly 6 DIFFERENT animal species that represent these 6 concepts:
1. ${traits[0].attribute_1}
2. ${traits[1].attribute_1}
3. ${traits[2].attribute_1}
4. ${traits[3].attribute_1}
5. ${traits[4].attribute_1}
6. ${traits[5].attribute_1}

CRITICAL REQUIREMENTS:
- Each animal must be a completely DIFFERENT species
- Vary between mammals, birds, reptiles, fish, insects, and other categories
- Choose animals that symbolically represent each concept
- Return ONLY a JSON array with 6 animal names, nothing else

Example format: ["lion", "crane", "dolphin", "butterfly", "snake", "elephant"]

Return only the JSON array:`;

  let selectedAnimals = [];
  try {
    const animalResponse = await textModel.generateContent([animalSelectionPrompt]);
    const animalText = animalResponse.response.candidates[0].content.parts[0].text;
    
    // Parse the animal list
    const match = animalText.match(/\[[\s\S]*?\]/);
    if (match) {
      selectedAnimals = JSON.parse(match[0]);
    } else {
      throw new Error("Failed to parse animal list");
    }
  } catch (err) {
    // Fallback to default animals if selection fails
    selectedAnimals = ["lion", "crane", "koi fish", "butterfly", "tiger", "phoenix"];
  }
  
  // Step 2: Generate images using the selected animals (in parallel for speed)
  const generatedImages = [];
  
  // Create all 6 image generation promises
  const imagePromises = traits.slice(0, 6).map(async (trait, i) => {
    const animalName = selectedAnimals[i] || "animal";
    
    const imagePrompt = `Generate a minimalist illustration of a ${animalName} in Chinese art style with clean lines and plain background. The ${animalName} represents "${trait.attribute_1}". Use ${trait.color_1} as primary color with ${trait.color_2} accents. No text in the image.`;
    
    try {
      const result = await imageModel.generateContent([imagePrompt]);
      const parts = result.response?.candidates?.[0]?.content?.parts;
      const base64Image = parts?.find(p => p.inlineData)?.inlineData?.data;
      
      if (base64Image) {
        const fileName = `Trait_${i + 1}.jpg`;
        const filePath = path.join(orderDir, fileName);
        fs.writeFileSync(filePath, Buffer.from(base64Image, "base64"));

        const imagePath = `JS/Generated_Images/Order_${orderID}/${fileName}`;
        
        return { 
          prompt: imagePrompt, 
          base64: base64Image, 
          image_path: imagePath,
          animal: animalName,
          index: i
        };
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  });
  
  // Wait for all 6 images to complete (in parallel)
  const results = await Promise.all(imagePromises);
  
  // Filter out null results and sort by index to maintain order
  results.forEach(result => {
    if (result) generatedImages.push(result);
  });
  
  return generatedImages;
}
// ---------- END: generateAllImages ----------
// ==================== END: SHARED UTILITY FUNCTIONS ====================


// ==================== ENDPOINT: POST /generate ====================
// Purpose: Main endpoint for generating traits and optionally images
// Handles: Initial generation, trait regeneration, image regeneration
// =================================================================
app.post('/generate', async (req, res) => {
  try {
    // Get user-provided core values from frontend
    const coreValues = req.body.coreValues;

    // Input validation - allow users to tell their full story across all input boxes
    if (coreValues && (typeof coreValues !== 'string' || coreValues.length > 10000)) {
      return res.status(400).json({ 
        success: false, 
        message: "Your story is too long. Please keep it under 10,000 characters." 
      });
    }
    
    // Trim whitespace
    if (coreValues) {
      req.body.coreValues = coreValues.trim();
    }

    // === 1. Determine traits: either provided by caller (regeneration) or generate via Gemini ===
    let traitsArray;
    if (req.body.traits && Array.isArray(req.body.traits) && req.body.traits.length > 0 && req.body.regenerate) {
      // Regeneration mode: generate BRAND NEW traits from Gemini, don't reuse old ones
      if (!coreValues) {
        return res.status(400).json({ success: false, message: "Missing coreValues for trait regeneration" });
      }
      const rawResponse = await generateTraits(coreValues);
      traitsArray = parseGeminiJSON(rawResponse);
    } else if (req.body.traits && Array.isArray(req.body.traits) && req.body.traits.length > 0) {
      // Old regeneration mode: reuse existing traits, just regenerate images
      traitsArray = req.body.traits;
    } else {
      // === generate via Gemini as before ===
      if (!coreValues) {
        return res.status(400).json({ success: false, message: "Missing coreValues for trait generation" });
      }
      const rawResponse = await generateTraits(coreValues);
      traitsArray = parseGeminiJSON(rawResponse);
    }

    // Generate images if orderID is provided (regeneration mode)
    // For first generation, images will be generated AFTER saving to DB
    let generatedImages = [];
    if (req.body.orderID) {
      // Validate orderID to prevent filesystem traversal
      const orderID = parseInt(req.body.orderID);
      if (isNaN(orderID) || orderID <= 0) {
        return res.status(400).json({ success: false, message: "Invalid orderID" });
      }
      
      // Check regeneration rate limit
      const rateLimit = checkRegenerationLimit(orderID);
      if (!rateLimit.allowed) {
        return res.status(429).json({ 
          success: false, 
          message: `Regeneration limit reached. Please try again in ${rateLimit.resetIn} minutes.`,
          remaining: 0,
          resetIn: rateLimit.resetIn
        });
      }
      
      generatedImages = await generateAllImages(traitsArray, orderID);
      
      // Attach image paths to traits
      generatedImages.forEach((img, i) => {
        if (traitsArray[i]) traitsArray[i].image_path = img.image_path;
      });
    }


    // Merge the traits with their associated images (if any were generated)
    const traitsWithImages = traitsArray.map((trait, index) => ({
      ...trait,
      base64Image: generatedImages[index] ? generatedImages[index].base64 : null,
      image_path: generatedImages[index] ? generatedImages[index].image_path : null
    }));

    // Send JSON response back to frontend containing both text and image results
    res.json({
      success: true,
      message: "AI traits generated successfully.",
      data: {
        prompt: coreValues,
        traits: traitsWithImages 
      }
    });

  } catch (error) {
    // If anything fails above, catch and return an error message
    res.status(500).json({ success: false, message: error.message });
  }
});
// ==================== END: POST /generate ====================

// ==================== ENDPOINT: POST /regenerate-images ====================
// Purpose: Regenerate images for existing order with proper orderID
// Called: After database save when orderID is available
// =========================================================================
app.post('/regenerate-images', async (req, res) => {
  try {
    const { traits, orderID } = req.body;

    if (!traits || !Array.isArray(traits) || traits.length === 0 || traits.length > 10) {
      return res.status(400).json({ success: false, message: "Invalid traits array" });
    }

    // Validate and sanitize orderID
    const validOrderID = parseInt(orderID);
    if (!validOrderID || isNaN(validOrderID) || validOrderID <= 0) {
      return res.status(400).json({ success: false, message: "Invalid orderID" });
    }

    // Check regeneration rate limit
    const rateLimit = checkRegenerationLimit(validOrderID);
    if (!rateLimit.allowed) {
      return res.status(429).json({ 
        success: false, 
        message: `Regeneration limit reached. Please try again in ${rateLimit.resetIn} minutes.`,
        remaining: 0,
        resetIn: rateLimit.resetIn
      });
    }

    // Generate all images using shared function
    const generatedImages = await generateAllImages(traits, validOrderID);
    const imagePaths = generatedImages.map(img => img.image_path);

    res.json({
      success: true,
      message: "Images regenerated successfully.",
      data: {
        imagePaths: imagePaths
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ==================== END: POST /regenerate-images ====================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ==================== SERVER STARTUP ====================
const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0';

// Listen on appropriate host based on environment
app.listen(PORT, HOST, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running at http://${HOST}:${PORT}`);
  }
});