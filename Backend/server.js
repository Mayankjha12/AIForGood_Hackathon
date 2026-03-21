const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Groq = require("groq-sdk");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Face descriptors ke liye limit badhayi hai

// 1. AI Setup (Groq)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.error("❌ DB Connection Error:", err));

// --- MONGODB SCHEMAS ---

// User Schema (Face Auth ke liye)
const userSchema = new mongoose.Schema({
    name: String,
    embedding: Array, // Face descriptors descriptors yahan store honge
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Farm Schema (MyFarm page ke liye)
const farmSchema = new mongoose.Schema({
    userName: String,
    crop: String,
    area: String,
    location: String,
    soilType: String,
    lastUpdated: { type: Date, default: Date.now }
});
const Farm = mongoose.model('Farm', farmSchema);

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    userName: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// --- API ROUTES ---

// A. FACE AUTHENTICATION ROUTES
// Register Naya Kisan
app.post('/api/register-face', async (req, res) => {
    try {
        const { name, embedding } = req.body;
        const newUser = new User({ name, embedding });
        await newUser.save();
        res.json({ success: true, message: "Face Registered Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login ke liye Users Fetch karna
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, 'name embedding');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// B. MY FARM ROUTES
// Farm data save ya update karna
app.post('/api/myfarm/update', async (req, res) => {
    try {
        const { userName, farmData } = req.body;
        const farm = await Farm.findOneAndUpdate(
            { userName }, 
            { ...farmData, lastUpdated: Date.now() }, 
            { upsert: true, new: true }
        );
        res.json({ success: true, farm });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Farm data get karna
app.get('/api/myfarm/:userName', async (req, res) => {
    try {
        const farm = await Farm.findOne({ userName: req.params.userName });
        res.json(farm || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// C. FEEDBACK ROUTE
app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.json({ success: true, message: "Feedback saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// D. AI CHAT WITH AUTO-TRANSLATION (Groq Llama 3)
app.post('/api/chat', async (req, res) => {
    try {
        const { query, farmData, lang } = req.body;

        // Prompt engineering for translation and agri-expertise
        const prompt = `
            You are 'AgroKheti AI', an expert agriculture assistant.
            The user is a farmer who speaks ${lang}.
            Context: Crop is ${farmData?.crop || 'not specified'}, Soil is ${farmData?.soilType || 'unknown'}.
            User Question: ${query}
            
            IMPORTANT: Provide the response strictly in ${lang} language. 
            Keep it simple, helpful, and culturally relevant for a farmer.
        `;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
            temperature: 0.7,
        });

        res.json({ 
            success: true, 
            reply: completion.choices[0].message.content 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Master Backend is running on port ${PORT}`);
});