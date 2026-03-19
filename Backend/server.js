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
// Fixed: Added options for better connection stability
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Agrokheti Database Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// --- API ROUTES ---

app.post('/api/ai/chat', async (req, res) => {
    try {
        const { farmData, lang } = req.body;
        // Optimization: Use gemini-1.5-flash for faster hackathon responses
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

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
        
        Keep the language very simple, like a friend talking to a farmer. 
        Use bullet points and bold text for readability.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ success: true, reply: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ success: false, reply: "AI Expert abhi vyast hai, kripya thodi der baad koshish karein." });
    }
});

app.get('/', (req, res) => res.send("Agrokheti Backend is Live and Connected to Gemini!"));

// --- VERCEL SPECIFIC CHANGES ---
const PORT = process.env.PORT || 8000;

// Local development ke liye listen karega, Vercel par nahi
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// Vercel handles the server execution via this export
module.exports = app;