const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MongoDB Connection (Atlas wala link use karna, localhost nahi chalega)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error("DB Error:", err));

router.post('/chat', async (req, res) => {
    try {
        const { farmData, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are KrishiSakhi AI... (Aapka pura prompt yahan)`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ success: true, reply: response.text() });
    } catch (error) {
        res.status(500).json({ success: false, reply: "AI Expert busy hai." });
    }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);