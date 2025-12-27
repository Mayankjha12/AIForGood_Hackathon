const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Models
const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback"); // Naya feedback model

const app = express();
app.use(cors());
app.use(express.json());

// Gemini API Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- 1. CHATBOT API (Gemini Trained on Farm Data) ---
app.post("/api/ai/chat", async (req, res) => {
    try {
        const { prompt, farmData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // AI ko train karne ke liye context
        const context = `You are KrishiSakhi AI, an expert agricultural advisor. 
        Context: Location: ${farmData?.location}, Crop: ${farmData?.crop}, Soil: ${farmData?.soilType}, Issue: ${farmData?.currentProblem}. 
        Provide specific farming advice. Answer in the user's language preference.`;
        
        const result = await model.generateContent(`${context} \nFarmer says: ${prompt}`);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 2. FARM FORM SUBMIT (Home Page) ---
app.post("/api/farms/submit", async (req, res) => {
    try {
        const farm = new Farm(req.body); //
        await farm.save();
        res.status(201).json({ success: true, message: "Farm data saved!", data: farm });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- 3. GET LATEST FARM (For "My Farm" Dashboard) ---
app.get("/api/farms/latest", async (req, res) => {
    try {
        const latestFarm = await Farm.findOne().sort({ createdAt: -1 }); // Naya data pehle
        if (!latestFarm) return res.status(404).json({ message: "No farm found" });
        res.json(latestFarm);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 4. FEEDBACK SUBMIT (Feedback Page) ---
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ success: true, message: "Dhanyawad! Feedback received." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected & Gemini Ready"))
    .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
