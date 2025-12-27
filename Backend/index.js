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

// DIRECT KEY INSERTED AS REQUESTED
const genAI = new GoogleGenerativeAI("AIzaSyBnnjzEU1BrB1H6RrmZelH62f_Fv8VtnuQ");

app.post("/api/ai/chat", async (req, res) => {
    try {
        const { prompt, farmData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const context = `You are KrishiSakhi AI Expert. 
        Farm Details: Location: ${farmData?.location}, Crop: ${farmData?.crop}, Soil: ${farmData?.soilType}.
        Give technical agricultural advice in English.`;
        
        const result = await model.generateContent(`${context} \nFarmer asks: ${prompt}`);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (err) {
        console.error("Gemini Error:", err.message);
        // Fallback message
        res.status(500).json({ reply: "Data saved! AI is busy, check 'My Farm' history soon." });
    }
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

// MONGO_URI dashboard se hi aayegi
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Ready"))
    .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
