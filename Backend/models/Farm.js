const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  landSize: String,
  crop: String,
  soilType: String,
  soilCharacter: String,
  irrigationSource: String,
  sowingType: String,
  sowingDate: Date,
  cropStage: String,
  currentProblem: String,
  voiceTranscript: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Farm", FarmSchema);