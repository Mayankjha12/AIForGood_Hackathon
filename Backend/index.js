const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");
const User = require("./models/User"); // Naya User Model

const app = express();
app.use(cors());
app.use(express.json());

// --- EXPERT RULE-BASED LOGIC (Vahi Purana) ---
const getExpertAdvice = (data) => {
    const soil = data.soilType || "Normal";
    const problem = (data.currentProblem || "").toLowerCase();
    
    let predictions = ["Wheat", "Mustard", "Barley"]; 
    if(soil === "Black") predictions = ["Cotton", "Soybean", "Gram"];
    else if(soil === "Red") predictions = ["Groundnut", "Maize", "Arhar"];
    else if(soil === "Sandy") predictions = ["Bajra", "Guar", "Moong"];

    let solution = "Your farm status is stable. Follow regular cycles.";
    if (problem.includes("pest") || problem.includes("insect")) {
        solution = "TECHNICAL ALERT: Pest activity detected. Spray Neem Oil and set up traps.";
    } else if (problem.includes("yellow") || problem.includes("growth")) {
        solution = "NUTRIENT DEFICIENCY: Signs of Nitrogen deficiency. Apply balanced NPK.";
    }

    let healthScore = 95;
    if (problem && problem !== "none") healthScore = 75;

    return { solution, predictions, score: healthScore };
};

// ================= NEW AUTH ROUTES =================
app.post("/api/auth/signup", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: "Farmer Registered!" });
    } catch (err) { res.status(400).json({ success: false, error: "Mobile number already exists!" }); }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile, password });
        if (user) res.json({ success: true, user: { name: user.farmerName, id: user._id, mobile: user.mobile } });
        else res.status(401).json({ success: false, error: "Invalid Mobile or Password" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ================= PURANE ROUTES (NO CHANGE) =================
app.post("/api/feedback", async (req, res) => {
    try {
        const fb = new Feedback(req.body);
        await fb.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post("/api/ai/chat", (req, res) => {
    const result = getExpertAdvice(req.body.farmData);
    res.json(result); 
});

app.post("/api/farms/submit", async (req, res) => {
    try {
        const advice = getExpertAdvice(req.body);
        const farm = new Farm({ ...req.body, healthScore: advice.score });
        await farm.save();
        res.status(201).json({ success: true, score: advice.score });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get("/api/farms/history", async (req, res) => {
    try {
        const history = await Farm.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("🚀 DB & Auth Ready"));
app.listen(process.env.PORT || 5001);
