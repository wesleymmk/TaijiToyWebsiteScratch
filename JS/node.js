// Author: AG
// Created: 9/4/25
// Description: Node.js backend server that receives core values from frontend,
// generates traits using Gemini API, then sends the traits to PHP to store in MySQL.

//Dependencies
require('dotenv').config(); 


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




console.log("Backend is starting...");

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running.'); // quick check route
});

/**
 * Gemini Trait Generation 
 */
async function generateTraits(coreValues) {
  // Gemini prompt 
  // This is the text instruction given to Gemini to produce personality traits,
  // each with two contrasting attributes and assigned colors.
  const prompt = `
Identify at least six key pairs of attributes that compare and contrast the duality of these two themes along with contrasting colors matched to these pairs. Write in a warm, conversational tone directly addressing the person exploring these themes. Provide a short and long description of each pairing and how it relates to the two themes through duality. Focus on the universal meanings of these themes without making assumptions about the person's past or creating fictional backstories. Use these colors only: Clear Black White Red Blue Green Yellow Grey Brown Purple Pink Orange Gold Silver.
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
The Core Values: ${coreValues}
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

    // Extract the raw text content from Gemini’s response
    const geminiResponseText = response.data.candidates[0].content.parts[0].text;
    return geminiResponseText;

  } catch (error) {
    // Log and throw if Gemini fails
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to call Gemini API");
  }
}


/**
 * Helper: generateImageForPrompt
 * Returns: base64-encoded image data (string) for the given text prompt.
 *
 * Uses the Gemini image model `gemini-2.5-flash-image` via the
 * `@google/generative-ai` client. Ensure `GEMINI_API_KEY` is set in env.
 */
async function generateImageForPrompt(promptText) {
  // Direct Gemini image generation using `gemini-2.5-flash-image`.
  // This helper always uses the Gemini image model and returns a base64 string or null.
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const result = await model.generateContent([promptText]);
    const parts = result.response?.candidates?.[0]?.content?.parts;
    const base64 = parts?.find(p => p.inlineData)?.inlineData?.data || null;
    if (!base64) {
      console.warn('Gemini image call returned no inlineData. Inspect response:', JSON.stringify(result).substring(0,1000));
      return null;
    }
    return base64;
  } catch (err) {
    throw new Error('Gemini image generation failed: ' + (err && err.message ? err.message : String(err)));
  }
}


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
      const match = rawResponse.match(/\[[\s\S]*\]/);
      if (!match) {
        console.error("Failed to extract JSON from response. Response preview:", rawResponse.substring(0, 500));
        throw new Error("No valid JSON array found in Gemini response");
      }
      const jsonString = match[0];
      console.log("Cleaned JSON string ready to parse:", jsonString.substring(0, 200) + "...");
      traitsArray = JSON.parse(jsonString);
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

      // The response comes as text — extract the JSON portion (between [ and ])
      const match = rawResponse.match(/\[[\s\S]*\]/);
      if (!match) {
        console.error("Failed to extract JSON from response. Response preview:", rawResponse.substring(0, 500));
        throw new Error("No valid JSON array found in Gemini response. Response: " + rawResponse.substring(0, 200));
      }

      const jsonString = match[0];
      console.log("Cleaned JSON string ready to parse:", jsonString.substring(0, 200) + "...");

      // Convert text into an actual JavaScript object (array of trait objects)
      traitsArray = JSON.parse(jsonString);
      console.log("Parsed traits:", traitsArray);
    }

   // ===============================================
   // === AI IMAGE GENERATION LOGIC START (Gemini API) ===
   // ===============================================
   // NOTE: Only generate images if orderID is provided (regeneration mode)
   // For first generation, images will be generated AFTER saving to DB

    const generatedImages = [];
       /* 
    // ------------------------
    //  SINGLE IMAGE VERSION for quick testing (COMMENTED OUT)
    // ------------------------

    // const firstTrait = traitsArray[0];
    // const imagePrompt = `Create a minimalist artistic animal representing the concept of ${firstTrait.attribute_1}, colored primarily in ${firstTrait.color_1} with accents of ${firstTrait.color_2}. Digital art style.`;

    // console.log("→ Calling Gemini image generation API...");

    // try {
    //   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    //   const result = await model.generateContent([imagePrompt]);
    //   const parts = result.response.candidates?.[0]?.content?.parts;
    //   const base64Image = parts?.find(p => p.inlineData)?.inlineData?.data;

    //   if (base64Image) {
    //     console.log(" Generated image successfully!");
    //     console.log("Base64 (first 100 chars):", base64Image.substring(0, 100) + "...");
    //     generatedImages.push({
    //       prompt: imagePrompt,
    //       base64: base64Image
    //     });
    //   } else {
    //     console.error(" No image returned from Gemini model.");
    //   }
    // } catch (err) {
    //   console.error(" Gemini image generation failed:", err.message);
    // }

    // ------------------------
    // END OLD SINGLE IMAGE VERSION
    // ------------------------
    */

    // ------------------------
    // NEW MULTI-IMAGE VERSION (6 images total)
    // ------------------------
   
    // Only generate and save images if we have an orderID (meaning this is a regeneration, not first generation)
    if (req.body.orderID) {
      console.log("→ Generating images for all 6 traits with orderID:", req.body.orderID);

      const fs = require("fs");
      const path = require("path");
      // functions to create folders for picture storage
      // Create base image folder
      const baseDir = path.join(__dirname, "Generated_Images");
      if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

      // Create per-order subfolder with the provided orderID
      const orderID = req.body.orderID;
      const orderDir = path.join(baseDir, `Order_${orderID}`);
      if (!fs.existsSync(orderDir)) fs.mkdirSync(orderDir, { recursive: true });

      // Image generation helper
      // The helper uses the Gemini image model (`gemini-2.5-flash-image`) to
      // generate base64-encoded images for each trait prompt.

      // Loop through all 6 traits 
      for (let i = 0; i < Math.min(6, traitsArray.length); i++) {
        const trait = traitsArray[i];
        const imagePrompt = `Create a minimalist artistic animal representing the concept of ${trait.attribute_1}, colored primarily in ${trait.color_1} with accents of ${trait.color_2}. Digital art style.`;

        try {
          console.log(`→ Generating image ${i + 1}/6 for "${trait.attribute_1}"...`);
          // Use the shared helper to produce a base64 image for the prompt.
          const base64Image = await generateImageForPrompt(imagePrompt);

          if (base64Image) {
            // Save each image to the Generated_Images folder
            const fileName = `Trait_${i + 1}.jpg`;
            const filePath = path.join(orderDir, fileName);
            fs.writeFileSync(filePath, Buffer.from(base64Image, "base64"));

            const imagePath = `JS/Generated_Images/Order_${orderID}/${fileName}`;
            generatedImages.push({ prompt: imagePrompt, base64: base64Image, image_path: imagePath });
            console.log(` Image ${i + 1} saved: ${imagePath}`);

            // Attach image_path to the corresponding trait
            traitsArray[i].image_path = imagePath;
          } else {
            console.error(` No image returned for trait ${i + 1}`);
          }
        } catch (err) {
          console.error(` Failed to generate image for trait ${i + 1}:`, err.message);
        }
      }
    } else {
      console.log("→ First generation mode: Skipping image generation (will be done after DB save)");
    }

    // ===============================================
    // === AI IMAGE GENERATION LOGIC END ===
    // ===============================================


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

// -------------------- REGENERATE IMAGES ENDPOINT --------------------
// New endpoint to regenerate images with proper orderID after database save
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

    const fs = require("fs");
    const path = require("path");
    const generatedImages = [];

    // Create base image folder
    const baseDir = path.join(__dirname, "Generated_Images");
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

    // Create per-order subfolder with proper orderID
    const orderDir = path.join(baseDir, `Order_${orderID}`);
    if (!fs.existsSync(orderDir)) fs.mkdirSync(orderDir, { recursive: true });

    // Use the shared helper to produce base64 images for each prompt.

    // Loop through all traits to regenerate images
    for (let i = 0; i < Math.min(6, traits.length); i++) {
      const trait = traits[i];
      const imagePrompt = `Create a minimalist artistic animal representing the concept of ${trait.attribute_1}, colored primarily in ${trait.color_1} with accents of ${trait.color_2}. Digital art style.`;

      try {
        console.log(`→ Regenerating image ${i + 1}/6 for "${trait.attribute_1}"...`);
        const base64Image = await generateImageForPrompt(imagePrompt);

        if (base64Image) {
          // Save each image to the Generated_Images folder with correct orderID
          const fileName = `Trait_${i + 1}.jpg`;
          const filePath = path.join(orderDir, fileName);
          fs.writeFileSync(filePath, Buffer.from(base64Image, "base64"));

          const imagePath = `JS/Generated_Images/Order_${orderID}/${fileName}`;
          generatedImages.push(imagePath);
          console.log(` Image ${i + 1} saved: ${imagePath}`);
        } else {
          console.error(` No image returned for trait ${i + 1}`);
        }
      } catch (err) {
        console.error(` Failed to regenerate image for trait ${i + 1}:`, err.message);
      }
    }

    res.json({
      success: true,
      message: "Images regenerated successfully.",
      data: {
        imagePaths: generatedImages
      }
    });

  } catch (error) {
    console.error("Error in /regenerate-images route:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------- START SERVER --------------------
const PORT = 3000;
// Listen on all network interfaces (0.0.0.0) for local + LAN access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server be ready at: http://localhost:${PORT}`);
});