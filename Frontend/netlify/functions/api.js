const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const Groq = require("groq-sdk");
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// Groq Initialize (Key Netlify Dashboard se aayegi)
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mayank:Agrokheti2026@kisan123.ilxcfbh.mongodb.net/KrishiSakhi?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

router.post('/chat', async (req, res) => {
    try {
        const { farmData, lang } = req.body;
        
        const prompt = `You are KrishiSakhi AI, a professional agricultural expert. 
        Analyze this data and provide a helpful report in ${lang || 'English'}:
        - Location: ${farmData.location}, Crop: ${farmData.crop}, 
        - Soil: ${farmData.soilType}, Problem: ${farmData.currentProblem || farmData.problem}.
        Provide specific organic/chemical solutions and irrigation advice.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
            temperature: 0.7,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "AI report generate nahi kar paya.";
        res.json({ success: true, reply: reply });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ success: false, reply: "AI Expert busy hai, please check logs." });
    }
});

// Test Route
router.get('/', (req, res) => res.send("KrishiSakhi API is Live and Running!"));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);