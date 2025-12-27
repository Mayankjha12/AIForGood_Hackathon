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

// --- SMART ML ANALYZER (Rule-based) ---
const calculateFarmHealth = (data) => {
    let score = 100;
    if (data.currentProblem && data.currentProblem !== "None") score -= 30;
    if (data.soilType === "Sandy" && data.irrigationSource === "Canal") score -= 10;
    if (data.cropStage === "Infected") score -= 20;
    return Math.max(score, 10); // Minimum 10 score
};

// --- 1. CHATBOT API (Updated for ML English Advice) ---
app.post("/api/ai/chat", async (req, res) => {
    try {
        const { prompt, farmData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // ML-Style Context for Gemini
        const context = `You are a Senior Agricultural Scientist. 
        Analyze this ML Farm Profile: 
        Location: ${farmData?.location}, Crop: ${farmData?.crop}, 
        Soil: ${farmData?.soilType}, Health Score: ${farmData?.healthScore}/100,
        Current Issue: ${farmData?.currentProblem}.
        
        Provide high-level technical farming advice. 
        IMPORTANT: Your entire response must be in English language only.`;
        
        const result = await model.generateContent(`${context} \nFarmer Request: ${prompt}`);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 2. FARM FORM SUBMIT (Updated with ML Scoring) ---
app.post("/api/farms/submit", async (req, res) => {
    try {
        const healthScore = calculateFarmHealth(req.body);
        const farm = new Farm({ ...req.body, healthScore }); 
        await farm.save();
        res.status(201).json({ success: true, message: "Farm data analyzed!", data: farm });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/api/farms/latest", async (req, res) => {
    try {
        const latestFarm = await Farm.findOne().sort({ createdAt: -1 });
        if (!latestFarm) return res.status(404).json({ message: "No farm found" });
        res.json(latestFarm);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ success: true, message: "Feedback received." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected with ML Logic"))
    .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
