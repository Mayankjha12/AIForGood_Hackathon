const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
    rating: Number,
    writtenFeedback: String,
    voiceTranscript: String, // Voice feedback ke liye
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Feedback", FeedbackSchema);
