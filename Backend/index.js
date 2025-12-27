const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ML Scoring Logic
const calculateFarmHealth = (data) => {
    let score = 100;
    if (data.currentProblem && data.currentProblem !== "None") score -= 30;
    if (data.soilType === "Sandy") score -= 5;
    return Math.max(score, 10);
};

// --- 1. CHATBOT API (English Expert Advice) ---
app.post("/api/ai/chat", async (req, res) => {
    try {
        const { prompt, farmData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const context = `You are KrishiSakhi AI, an expert agricultural advisor. 
        Context: Location: ${farmData?.location}, Crop: ${farmData?.crop}, Soil: ${farmData?.soilType}, Health Score: ${farmData?.healthScore}/100.
        Provide professional technical advice in English language only.`;
        
        const result = await model.generateContent(`${context} \nFarmer says: ${prompt}`);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 2. SUBMIT FORM (With ML Score) ---
app.post("/api/farms/submit", async (req, res) => {
    try {
        const healthScore = calculateFarmHealth(req.body);
        const farm = new Farm({ ...req.body, healthScore });
        await farm.save();
        res.status(201).json({ success: true, score: healthScore, data: farm });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- 3. NEW: GET ALL HISTORY (Vertical Feed) ---
app.get("/api/farms/history", async (req, res) => {
    try {
        const history = await Farm.find().sort({ createdAt: -1 }); // Newest first
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Other routes...
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ Backend with History Ready"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
