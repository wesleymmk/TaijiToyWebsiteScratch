// Author: AG
// Created: 9/4/25
// Description: Node.js backend server that receives core values from frontend,
// generates traits using Gemini API, then sends the traits to PHP to store in MySQL.

//Dependencies
require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Web framework
const axios = require('axios');     // For request Gemini API & PHP
const cors = require('cors');       

// Express Setup
const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors());         

console.log("Backend is starting...");

//test
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// Gemini Trait Generation 
async function generateTraits(coreValues) {
  // Gemini prompt 
  const prompt = `
Identify at least six key pairs of attributes that compare and contrast the duality of these two themes in my life along with contrasting colors matched to these pairs. Make the tone conversational as if I were having a conversation with an old, dear friend. Provide a short and long description of each pairing and how it relates to the two themes through duality. Use these colors only: Clear Black White Red Blue Green Yellow Grey Brown Purple Pink Orange Gold Silver.
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
My Core Values: ${coreValues}
`;

  try {
    // Call Gemini API stucture from google
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract Gemini response text
    const geminiResponseText = response.data.candidates[0].content.parts[0].text;
    return geminiResponseText;

  } catch (error) {
    //API errors debug
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to call Gemini API");
  }
}


app.post('/generate', async (req, res) => {
  try {
    const coreValues = req.body.coreValues;

    // Check for valid input
    if (!coreValues) {
      return res.status(400).json({ success: false, message: "Missing coreValues" });
    }

    console.log("Received core values:", coreValues);

    //  Call Gemini API
    const rawResponse = await generateTraits(coreValues);
    console.log("Raw Gemini response:", rawResponse);

    // Extract JSON array from Gemini's response
    const match = rawResponse.match(/\[[\s\S]*\]/);
    if (!match) {
      throw new Error("No valid JSON array found in Gemini response");
    }

    const jsonString = match[0];
    console.log("Cleaned JSON string ready to parse:", jsonString.substring(0, 200) + "...");

    //  Parse string to JS object
    const traitsArray = JSON.parse(jsonString);
    console.log("Parsed traits:", traitsArray);

    res.json({
          success: true,
          message: "AI traits generated successfully (PHP step skipped).",
          data: {
      prompt: coreValues,
      traits: traitsArray
          }
      });

  } catch (error) {
    console.error("Error in /generate route:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// start server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server be ready at: http://localhost:${PORT}`);
});
