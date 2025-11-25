// Author: AG
// Created: 9/4/25
// Description: Node.js backend server that receives core values from frontend,
// generates traits using Gemini API, then sends the traits to PHP to store in MySQL.

//Dependencies
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); 


const express = require('express'); 
const axios = require('axios');     
const cors = require('cors');       

const { GoogleGenerativeAI } = require("@google/generative-ai");
// SDK import for using Gemini models directly through Google's Generative AI package

// Express Setup
const app = express();
app.use(express.json()); // allows the app to read JSON request bodies
// Enable CORS with credentials so browser cookies (PHP session) can be forwarded to Node
app.use(cors({ origin: true, credentials: true }));

//  Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    console.log("=== DEBUG: Calling Gemini API ===");
    console.log("Core Values Input:", coreValues);
    
    
    // Call the Gemini API using axios — here we're using the "text generation" model (gemini-2.0-flash)
    // It returns a conversational, structured JSON output describing six pairs of traits.
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("=== DEBUG: Gemini API Success ===");
    // Extract the raw text content from Gemini's response
    const geminiResponseText = response.data.candidates[0].content.parts[0].text;
    return geminiResponseText;

  } catch (error) {
    // Log and throw if Gemini fails
    console.error("=== DEBUG: Gemini API Error ===");
    console.error("Error message:", error.message);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", JSON.stringify(error.response?.data, null, 2));
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
    console.error("Failed to extract JSON from response. Response preview:", rawResponse.substring(0, 500));
    throw new Error("No valid JSON array found in Gemini response");
  }
  const jsonString = match[0];
  console.log("Cleaned JSON string ready to parse:", jsonString.substring(0, 200) + "...");
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
  
  // Build comprehensive prompt for all 6 images
  const allTraitsPrompt = `Generate 6 different minimalist animal illustrations in Chinese art style with clean lines and plain backgrounds. Each animal must be a DIFFERENT species. Vary between mammals, birds, reptiles, fish, insects, etc. No text in any image.

The 6 animals should represent these concepts with these colors:
1. ${traits[0].attribute_1} - Primary color: ${traits[0].color_1}, Accent: ${traits[0].color_2}
2. ${traits[1].attribute_1} - Primary color: ${traits[1].color_1}, Accent: ${traits[1].color_2}
3. ${traits[2].attribute_1} - Primary color: ${traits[2].color_1}, Accent: ${traits[2].color_2}
4. ${traits[3].attribute_1} - Primary color: ${traits[3].color_1}, Accent: ${traits[3].color_2}
5. ${traits[4].attribute_1} - Primary color: ${traits[4].color_1}, Accent: ${traits[4].color_2}
6. ${traits[5].attribute_1} - Primary color: ${traits[5].color_1}, Accent: ${traits[5].color_2}

CRITICAL: Each of the 6 images MUST feature a completely different animal species. Generate all 6 images.`;

  try {
    console.log(`→ Generating all 6 images in a single request...`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const result = await model.generateContent([allTraitsPrompt]);
    const parts = result.response?.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      console.error(' No images returned from Gemini');
      return [];
    }
    
    // Extract and save all images
    const images = parts.filter(p => p.inlineData).map(p => p.inlineData.data);
    console.log(`✓ Received ${images.length} images from Gemini`);
    
    const generatedImages = [];
    for (let i = 0; i < Math.min(6, images.length, traits.length); i++) {
      const base64Image = images[i];
      const fileName = `Trait_${i + 1}.jpg`;
      const filePath = path.join(orderDir, fileName);
      fs.writeFileSync(filePath, Buffer.from(base64Image, "base64"));

      const imagePath = `JS/Generated_Images/Order_${orderID}/${fileName}`;
      generatedImages.push({ prompt: allTraitsPrompt, base64: base64Image, image_path: imagePath });
      console.log(`  Image ${i + 1} saved: ${imagePath}`);
    }
    
    return generatedImages;
  } catch (err) {
    console.error(' Failed to generate images:', err.message);
    return [];
  }
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

    // === 1. Determine traits: either provided by caller (regeneration) or generate via Gemini ===
    let traitsArray;
    if (req.body.traits && Array.isArray(req.body.traits) && req.body.traits.length > 0 && req.body.regenerate) {
      // Regeneration mode: generate BRAND NEW traits from Gemini, don't reuse old ones
      if (!coreValues) {
        return res.status(400).json({ success: false, message: "Missing coreValues for trait regeneration" });
      }
      console.log("Regeneration mode: Generating NEW traits from Gemini with core values:", coreValues);
      const rawResponse = await generateTraits(coreValues);
      console.log("Raw Gemini response:", rawResponse);
      traitsArray = parseGeminiJSON(rawResponse);
      console.log("Parsed NEW traits:", traitsArray);
    } else if (req.body.traits && Array.isArray(req.body.traits) && req.body.traits.length > 0) {
      // Old regeneration mode: reuse existing traits, just regenerate images
      traitsArray = req.body.traits;
      console.log("Using traits provided in request (image-only regeneration). Count:", traitsArray.length);
    } else {
      // === generate via Gemini as before ===
      if (!coreValues) {
        return res.status(400).json({ success: false, message: "Missing coreValues for trait generation" });
      }
      console.log("Received core values:", coreValues);
      const rawResponse = await generateTraits(coreValues);
      console.log("Raw Gemini response:", rawResponse);
      traitsArray = parseGeminiJSON(rawResponse);
      console.log("Parsed traits:", traitsArray);
    }

    // Generate images if orderID is provided (regeneration mode)
    // For first generation, images will be generated AFTER saving to DB
    let generatedImages = [];
    if (req.body.orderID) {
      console.log("→ Generating images for all 6 traits with orderID:", req.body.orderID);
      generatedImages = await generateAllImages(traitsArray, req.body.orderID);
      
      // Attach image paths to traits
      generatedImages.forEach((img, i) => {
        if (traitsArray[i]) traitsArray[i].image_path = img.image_path;
      });
    } else {
      console.log("→ First generation mode: Skipping image generation (will be done after DB save)");
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
    console.error("Error in /generate route:", error.message);
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
    console.log('[/regenerate-images] Received request. full body:', JSON.stringify(req.body));
    console.log('[/regenerate-images] Headers cookie:', req.headers.cookie || '(none)');

    if (!traits || !Array.isArray(traits) || traits.length === 0) {
      return res.status(400).json({ success: false, message: "Missing traits" });
    }

    if (!orderID) {
      return res.status(400).json({ success: false, message: "Missing orderID" });
    }

    // Generate all images using shared function
    const generatedImages = await generateAllImages(traits, orderID);
    const imagePaths = generatedImages.map(img => img.image_path);

    res.json({
      success: true,
      message: "Images regenerated successfully.",
      data: {
        imagePaths: imagePaths
      }
    });

  } catch (error) {
    console.error("Error in /regenerate-images route:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});
// ==================== END: POST /regenerate-images ====================

// ==================== SERVER STARTUP ====================
const PORT = 3000;
// Listen on all network interfaces (0.0.0.0) for local + LAN access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server be ready at: http://localhost:${PORT}`);
});