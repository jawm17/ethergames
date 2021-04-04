const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Score", ScoreSchema);