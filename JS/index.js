require('dotenv').config();             //recommemded 
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

console.log(" backend starting...");

app.get('/', (req, res) => {
  res.send('  Backend is running');
});

// Function to generate traits and colors with Gemini    
async function generateTraits(coreValues) {
  const prompt = `
Identify at least six key pairs of attributes that compare and contrast the duality of these two themes in my life along with contrasting colors matched to these pairs. Make the tone conversational as if I were having a conversation with an old, dear friend. Provide a short and long description of each pairing and how it relates to the two themes through duality. Use these colors only: Clear Black White Red Blue Green Yellow Grey Brown Purple Pink Orange Gold Silver.

My Core Values: ${coreValues}
`;
      // from google exmaple api
    try {
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

      const geminiText = response.data.candidates[0].content.parts[0].text;
      return geminiText;
    } catch (err) {
      console.error(" Gemini API error:", err.message);
      throw new Error("Gemini API call failed");
    }
  }

app.post('/generate', async (req, res) => {
  try {
    const coreValues = req.body.coreValues;
    if (!coreValues) return res.status(400).json({ success: false, message: "Missing coreValues" });

    console.log(" Received coreValues:", coreValues);
    const traits = await generateTraits(coreValues);

    res.json({
      success: true,
      text: traits,
      imageBase64: ""
    });
  } catch (err) {
    console.error(" /generate Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server ready at: http://localhost:${PORT}`);
});

