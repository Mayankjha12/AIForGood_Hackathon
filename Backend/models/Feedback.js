const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    rating: Number,
    writtenFeedback: String,
    voiceTranscript: String, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
