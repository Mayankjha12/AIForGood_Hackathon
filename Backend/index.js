const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Models
const Farm = require("./models/Farm");
const Feedback = require("./models/Feedback");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// --- 30+ VARIATION EXPERT LOGIC ---
const getExpertAdvice = (data) => {
    const soil = data.soilType || "Alluvial";
    const problem = (data.currentProblem || "").toLowerCase();
    
    // Memory Based Knowledge Collection
    const knowledge = {
        "Alluvial": { crops: ["Wheat", "Paddy", "Sugarcane"], tips: ["Use Nitrogen rich fertilizers.", "Monitor water levels."] },
        "Black": { crops: ["Cotton", "Soybean", "Gram"], tips: ["Deep plowing is recommended.", "Avoid water stagnation."] },
        "Red": { crops: ["Groundnut", "Maize", "Tobacco"], tips: ["Correct acidity with lime.", "Add organic manure."] },
        "Sandy": { crops: ["Mustard", "Bajra", "Guar"], tips: ["Use Drip irrigation.", "Apply compost to improve texture."] },
        "Loamy": { crops: ["Vegetables", "Wheat", "Fruit crops"], tips: ["Maintain crop rotation.", "Balanced NPK is best."] },
        "Clay": { crops: ["Rice", "Jute", "Sugarcane"], tips: ["Improve drainage system.", "Add gypsum if soil is hard."] }
    };

    const advice = knowledge[soil] || knowledge["Alluvial"];
    
    let technicalSolution = "Your farm is stable. Maintain current practices.";
    if (problem.includes("pest")) technicalSolution = "ALERT: Pest detected! Spray Neem Oil or use Pheromone traps.";
    else if (problem.includes("yellow")) technicalSolution = "NUTRIENT: Signs of Deficiency. Apply balanced NPK/Organic Compost.";

    const fullReply = `🌾 KrishiSakhi Expert Report:
✅ Best 3 Crops: 1. ${advice.crops[0]}, 2. ${advice.crops[1]}, 3. ${advice.crops[2]}
🛠️ Suggestions: • ${advice.tips[0]} • ${advice.tips[1]}
📢 Diagnosis: ${technicalSolution}`;

    return { reply: fullReply, score: (problem && problem !== "none") ? 75 : 95 };
};

// --- AUTH ROUTES ---
app.post("/api/auth/signup", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: "Farmer Registered!" });
    } catch (err) { res.status(400).json({ success: false, error: "Mobile number exists!" }); }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile, password });
        if (user) res.json({ success: true, user: { name: user.farmerName, id: user._id } });
        else res.status(401).json({ success: false, error: "Invalid Login" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- FARM & CHAT ROUTES ---
app.post("/api/ai/chat", (req, res) => {
    const result = getExpertAdvice(req.body.farmData);
    res.json({ reply: result.reply });
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

// --- FEEDBACK ROUTE ---
app.post("/api/feedback", async (req, res) => {
    try {
        const fb = new Feedback(req.body);
        await fb.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("🚀 Full System Live"));
app.listen(process.env.PORT || 5001);
