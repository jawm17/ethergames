const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    numTx: {
        type: Number,
        default: 0
    },
    sentTx: {
        type: Array,
        default: []
    },
    recievedTx: {
        type: Array,
        default: []
    },
    scores: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('User',UserSchema);