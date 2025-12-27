const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

// --- Smart Expert Engine ---
const getExpertAdvice = (data) => {
    const soil = data.soilType || "Normal";
    const problem = (data.currentProblem || "").toLowerCase();
    
    // Exact match for soil based predictions
    let predictions = ["Wheat", "Mustard", "Barley"]; 
    if(soil === "Black") predictions = ["Cotton", "Soybean", "Gram"];
    else if(soil === "Red") predictions = ["Groundnut", "Maize", "Arhar"];
    else if(soil === "Sandy") predictions = ["Bajra", "Guar", "Moong"];
    else if(soil === "Alluvial") predictions = ["Rice", "Sugarcane", "Potato"];

    let solution = "Your farm status is stable. Follow regular irrigation cycles.";
    if (problem.includes("pest") || problem.includes("insect")) {
        solution = "TECHNICAL ALERT: Pest activity detected. \n• Action: Spray 5% Neem Seed Kernel Extract. \n• Management: Set up sticky traps.";
    } else if (problem.includes("yellow") || problem.includes("growth")) {
        solution = "NUTRIENT DEFICIENCY: Signs of Nitrogen deficiency. \n• Action: Apply balanced NPK or micronutrient spray.";
    }

    let healthScore = 95;
    if (problem && problem !== "none") healthScore = 75;

    return { solution, predictions, score: healthScore };
};

// --- ROUTES ---
app.post("/api/ai/chat", (req, res) => {
    const { farmData } = req.body;
    const result = getExpertAdvice(farmData);
    res.json(result); 
});

app.post("/api/farms/submit", async (req, res) => {
    try {
        const advice = getExpertAdvice(req.body);
        const farm = new Farm({ ...req.body, healthScore: advice.score });
        await farm.save();
        res.status(201).json({ success: true, score: advice.score, data: farm });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post("/api/feedback", async (req, res) => {
    try {
        const fb = new Feedback(req.body);
        await fb.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get("/api/farms/history", async (req, res) => {
    try {
        const history = await Farm.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 Backend Live"))
    .catch(err => console.error(err));

app.listen(process.env.PORT || 5001);
