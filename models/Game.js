const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    samplePic: {
        type: String,
        default: ""
    },
    scores: {
        type: Object,
        default: {}
    },
    pot: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Game',GameSchema);