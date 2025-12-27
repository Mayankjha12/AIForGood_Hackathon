const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farm = require("./models/Farm");
const app = express();
app.use(cors());
app.use(express.json());

// --- Expert Rule-Based Logic (No API Key Needed) ---
const getExpertAdvice = (data) => {
    const crop = data.crop || "Crop";
    const problem = data.currentProblem || "General";
    
    // Custom logic based on Farmer's input
    if (problem.toLowerCase().includes("pest") || problem.toLowerCase().includes("insect")) {
        return `Expert Advice for ${crop}: Immediate application of Neem Oil or recommended Bio-pesticides is advised. Ensure the leaves are sprayed underside where pests hide. Monitor moisture levels closely.`;
    }
    if (problem.toLowerCase().includes("water") || problem.toLowerCase().includes("irrigation")) {
        return `Irrigation Alert for ${crop}: Based on your soil type (${data.soilType}), use Drip irrigation to save water. Water early morning to prevent fungal growth. Check for soil drainage issues.`;
    }
    if (problem.toLowerCase().includes("yellow") || problem.toLowerCase().includes("growth")) {
        return `Nutrient Report for ${crop}: Yellowing leaves suggest Nitrogen deficiency. Apply balanced NPK fertilizer or Organic Compost. Ensure 6-8 hours of sunlight for better recovery.`;
    }

    // Default response for other cases
    return `Technical Recommendation: Your ${crop} in ${data.soilType} soil requires balanced fertilization. Since your health score is ${data.healthScore}/100, we suggest a soil test before the next sowing cycle. Keep monitoring the crop stage: ${data.cropStage}.`;
};

app.post("/api/ai/chat", async (req, res) => {
    try {
        const { farmData } = req.body;
        // AI ki jagah hamara expert engine response dega
        const reply = getExpertAdvice(farmData);
        res.json({ reply });
    } catch (err) {
        res.json({ reply: "Data saved! Expert advice will be updated in My Farm." });
    }
});

app.post("/api/farms/submit", async (req, res) => {
    try {
        let score = 100;
        if (req.body.currentProblem && req.body.currentProblem !== "None") score = 75;
        if (req.body.soilType === "Sandy") score -= 5;

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
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
