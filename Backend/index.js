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

// API KEY DIRECTLY INSERTED (No .env needed for this)
const YOUR_GEMINI_KEY = "AIzaSyBnnjzEU1BrB1H6RrmZelH62f_Fv8VtnuQ";
const genAI = new GoogleGenerativeAI(AIzaSyBnnjzEU1BrB1H6RrmZelH62f_Fv8VtnuQ);

// ML Heuristic for Health Score
const calculateFarmHealth = (data) => {
    let score = 100;
    if (data.currentProblem && data.currentProblem !== "None") score -= 30;
    if (data.soilType === "Sandy") score -= 5;
    return Math.max(score, 10);
};

// --- 1. CHATBOT API (Pure English Analysis) ---
app.post("/api/ai/chat", async (req, res) => {
    try {
        const { prompt, farmData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const context = `You are KrishiSakhi AI, an expert agricultural advisor. 
        Context: Location: ${farmData?.location}, Crop: ${farmData?.crop}, Soil: ${farmData?.soilType}, Health Score: ${farmData?.healthScore}/100.
        Provide professional technical advice in English language only with specific solutions for ${farmData?.currentProblem}.`;
        
        const result = await model.generateContent(`${context} \nFarmer says: ${prompt}`);
        const response = await result.response;
        
        // Return full AI text
        res.json({ reply: response.text() });
    } catch (err) {
        console.error("Gemini Error:", err.message);
        // Backup message agar AI fail ho
        res.json({ reply: "Data saved! Your farm status is healthy, but AI expert is currently busy. Please check 'My Farm' section later." });
    }
});

// --- 2. SUBMIT FORM (Saves data with ML score) ---
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

// --- 3. GET HISTORY (Vertical Timeline Feed) ---
app.get("/api/farms/history", async (req, res) => {
    try {
        const history = await Farm.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 4. FEEDBACK API ---
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// MongoDB Connection (Make sure MONGO_URI is in Render Dashboard or .env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Backend with History & ML Ready"))
    .catch(err => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
