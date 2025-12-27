const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

// --- Smart Expert Engine (No API Key Needed) ---
const getExpertAdvice = (data) => {
    const soil = data.soilType || "Unknown";
    const problem = (data.currentProblem || "").toLowerCase();
    
    // 1. Crop Prediction based on Soil Type
    let predictions = ["Wheat", "Mustard", "Barley"]; 
    if(soil === "Black") predictions = ["Cotton", "Soybean", "Gram"];
    if(soil === "Red") predictions = ["Groundnut", "Maize", "Pigeon Pea"];
    if(soil === "Sandy") predictions = ["Bajra", "Guar", "Watermelon"];
    if(soil === "Alluvial") predictions = ["Rice", "Sugarcane", "Jute"];

    // 2. Detailed Technical Solution
    let solution = "Your farm status is stable. Maintain regular moisture levels.";
    if (problem.includes("pest") || problem.includes("insect")) {
        solution = "TECHNICAL ALERT: Pest activity detected. \n• Action: Spray 5% Neem Seed Kernel Extract (NSKE). \n• Management: Set up yellow sticky traps. \n• Tip: Check leaves underside twice a day.";
    } else if (problem.includes("yellow") || problem.includes("growth")) {
        solution = "NUTRIENT DEFICIENCY: Signs of Nitrogen/Iron deficiency. \n• Action: Apply balanced NPK or micronutrient spray. \n• Organic: Mix well-decomposed cow dung manure. \n• Caution: Don't overwater; it leaches nutrients.";
    } else if (problem.includes("water") || problem.includes("irrigation") || problem.includes("dry")) {
        solution = "WATER MANAGEMENT: Stress detected. \n• System: Use Drip irrigation to avoid root rot. \n• Timing: Water early morning (before 8 AM). \n• Mulching: Cover soil with straw to prevent evaporation.";
    }

    return {
        solution,
        predictions,
        score: data.healthScore || 75
    };
};

// --- API ROUTES ---
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post("/api/ai/chat", async (req, res) => {
    try {
        const { farmData } = req.body;
        // Backend expert system handles logic
        const result = getExpertAdvice(farmData);
        res.json(result); 
    } catch (err) { res.json({ solution: "Data saved! Expert advice is in My Farm.", predictions: ["N/A"] }); }
});

app.post("/api/farms/submit", async (req, res) => {
    try {
        let score = 100;
        if (req.body.currentProblem && req.body.currentProblem !== "None") score = 75;
        const farm = new Farm({ ...req.body, healthScore: score });
        await farm.save();
        res.status(201).json({ success: true, score, data: farm });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get("/api/farms/history", async (req, res) => {
    try {
        const history = await Farm.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Offline Expert System Ready"))
    .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
