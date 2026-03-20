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

// Teri Groq Key yahan set kar di hai
const groq = new Groq({ 
    apiKey: "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" 
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mayank:Agrokheti2026@kisan123.ilxcfbh.mongodb.net/KrishiSakhi?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

router.post('/chat', async (req, res) => {
    try {
        const { farmData, lang } = req.body;
        
        // Detailed Prompt for KrishiSakhi
        const prompt = `You are KrishiSakhi AI, a professional agricultural expert. 
        Analyze the following data and provide a helpful report in ${lang || 'English'}:
        - Location: ${farmData.location}
        - Crop: ${farmData.crop}
        - Soil Type: ${farmData.soilType}
        - Soil Character: ${farmData.soilCharacter}
        - Problem: ${farmData.problem}
        
        Provide specific advice on:
        1. Possible cause of the problem.
        2. Recommended organic or chemical solutions.
        3. Fertilizer or irrigation adjustments.
        Keep it professional and encouraging for the farmer.`;

        // Llama 3 Model Call (Super Fast)
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a report.";
        res.json({ success: true, reply: reply });

    } catch (error) {
        console.error("Groq/Backend Error:", error);
        res.status(500).json({ 
            success: false, 
            reply: "AI Expert is currently busy. Please check your connection and try again." 
        });
    }
});

// Netlify Function Path Fix
router.get('/', (req, res) => res.send("KrishiSakhi API is Live and Running!"));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);