const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    plays: {
        type: Number,
        default: 0
    },
    scores: {
        type: Array,
        default: []
    },
    pot: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Account',AccountSchema);