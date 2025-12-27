const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    farmerName: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    yearlyIncome: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
