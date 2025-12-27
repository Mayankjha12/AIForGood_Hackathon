const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

// --- Expert Rule-Based Logic (No API Key Needed) ---
const getExpertAdvice = (data) => {
    const crop = data.crop || "Crop";
    const problem = (data.currentProblem || "").toLowerCase();
    
    if (problem.includes("pest") || problem.includes("insect")) {
        return `Expert Advice for ${crop}: Apply Neem Oil or Bio-pesticides. Spray underside of leaves.`;
    }
    if (problem.includes("water") || problem.includes("irrigation")) {
        return `Irrigation Alert for ${crop}: In ${data.soilType} soil, use Drip irrigation. Water early morning.`;
    }
    if (problem.includes("yellow") || problem.includes("growth")) {
        return `Nutrient Report for ${crop}: Apply balanced NPK fertilizer or Organic Compost for recovery.`;
    }
    return `Technical Recommendation: Your ${crop} is stable. Maintain health score: ${data.healthScore}/100.`;
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
        const reply = getExpertAdvice(farmData);
        res.json({ reply });
    } catch (err) { res.json({ reply: "Data saved! Expert advice is in My Farm." }); }
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
    .then(() => console.log("✅ Server & DB Ready"))
    .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
