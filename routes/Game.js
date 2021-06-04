const express = require('express');
const gameRouter = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };


// remove route during production
gameRouter.post('/newgame', (req, res) => {
    const { name, samplePic } = req.body;
    const newGame = new Game({ name, samplePic });
    newGame.save(err => {
        if (err)
            res.status(500).json({ message: message });
        else
            res.status(201).json({ message: { msgBody: "Game successfully created", msgError: false } });
    });
});

// update pot for game: game
gameRouter.post('/payment', (req, res) => {
    const { amount, game } = req.body;
    User.findOneAndUpdate({ _id: req.user._id }, { $inc: { balance: -amount }, $push: { sentTx: { to: game, "amount": amount, "type": "payment", "timeStamp": Date.now() } } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            Game.findOneAndUpdate({ name: game }, { $inc: { pot: amount } }).exec((err, document) => {
                if (err) {
                    res.status(500).json({ message: message });
                }
                else {
                    res.status(200).json({ message: { msgBody: "Successfully increased pot", msgError: false } });
                }
            });
        }
    });
});

// pot payout
gameRouter.post('/potPayment', (req, res) => {
    const { game } = req.body;
    Game.findOneAndUpdate({ "name": game }, { "pot": 0 }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            User.findOneAndUpdate({ _id: req.user._id }, { $inc: { balance: document.pot }, $push: { recievedTx: { from: game, "amount": document.pot, "type": "jackpot", "timeStamp": Date.now() } } }).exec((err, document) => {
                if (err) {
                    res.status(500).json({ message });
                }
                else {
                    res.status(200).json({ message: { msgBody: "Successfully updated balance", msgError: false } });
                }
            });
        }
    });
});

// update score
gameRouter.post('/score', (req, res) => {
    const { game, score, user } = req.body;
    Game.findOneAndUpdate({ name: game }, { $push: { scores: { "score": score, "user": user, "timeStamp": Date.now() } } }).exec((err, document) => {
        if (err)
            res.status(500).json({ message: message });
        else
        User.findOneAndUpdate({ _id: req.user._id }, { $push: { scores: { "game": game, "score": score, "user": user, "timeStamp": Date.now() } } }).exec((err, document) => {
            if (err)
                res.status(500).json({ message: message });
            else
                res.status(201).json({ message: { msgBody: "Successfully updated score", msgError: false } });
        });
    });
});

// get info for req.params.game
gameRouter.get('/info/:game', (req, res) => {
    Game.findOne({ "name": req.params.game }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            res.status(200).json({ name: document.name, img: document.samplePic, scores: document.scores, pot: document.pot });
        }
    });
});

module.exports = gameRouter;