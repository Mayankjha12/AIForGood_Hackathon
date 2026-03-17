const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Gemini AI Config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Agrokheti Database Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// --- API ROUTES ---

// AI Recommendation Route
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { farmData, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // User ki selected language ke hisab se prompt set karna
        const prompt = `You are KrishiSakhi AI, a professional Indian Agriculture Expert. 
        Analyze the following farmer's data:
        - Location: ${farmData.location}
        - Soil Type: ${farmData.soilType}
        - Current Crop: ${farmData.crop}
        - Crop Stage: ${farmData.cropStage}
        - Current Problem: ${farmData.currentProblem}

        Respond ONLY in ${lang} language. 
        Please provide the response in this format:
        1. Suitability: Is the crop right for this location and soil?
        2. Recommendations: 3 High-profit alternative crops for ${farmData.location}.
        3. Problem Solution: Step-by-step solution for "${farmData.currentProblem}".
        4. Expert Advice: One pro-tip for the farmer based on the crop stage ${farmData.cropStage}.
        
        Keep the language very simple, like a friend talking to a farmer.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ success: true, reply: response.text() });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ success: false, reply: "AI Expert abhi vyast hai, kripya thodi der baad koshish karein." });
    }
});

app.get('/', (req, res) => res.send("Agrokheti Backend is Live and Connected to Gemini!"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));