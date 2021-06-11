const express = require('express');
const gameRouter = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };
var Web3 = require("web3");
var web3 = new Web3(
    new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/ee2cbc278b5442dfbd27dedb4806c237"
    )
);
const centralKee = "c34a973c6ac6417fb516fd88ff3e573bebcb6c5af105ff3762d262aa606d2981";

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
    const { amount, game, address } = req.body;
    User.findOneAndUpdate({ address }, { $inc: { balance: -amount }, $push: { sentTx: { to: game, "amount": amount, "type": "payment", "timeStamp": Date.now() } } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            Game.findOneAndUpdate({ name: game }, { $inc: { pot: parseFloat(amount * 0.8) } }).exec((err, document) => {
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
gameRouter.post('/payout', (req, res) => {
    const { game, address } = req.body;
    Game.findOneAndUpdate({ "name": game }, { "pot": 0 }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            web3.eth.accounts.signTransaction(
                {
                    to: address,
                    value: parseInt(document.pot * 1000000000000000000),
                    gas: 21000,
                },
                centralKee
            ).then((signedTx) => {
                web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    .then((receipt) => {
                        res.status(200).json({ receipt: receipt });
                    })
                    .catch((err) => res.status(500).json({ err }));
            });
            // User.findOneAndUpdate({ address }, { $push: { recievedTx: { from: game, "amount": document.pot, "type": "jackpot", "timeStamp": Date.now() } } }).exec((err, document) => {
            //     if (err) {
            //         res.status(500).json({ message });
            //     }
            //     else {
            //         res.status(200).json({ message: { msgBody: "Successfully updated balance", msgError: false } });
            //     }
            // });
        }
    });
});

// update score
gameRouter.post('/score', (req, res) => {
    const { game, score, address } = req.body;
    Game.findOneAndUpdate({ name: game }, { $push: { scores: { "score": score, "address": address, "timeStamp": Date.now() } } }).exec((err, document) => {
        if (err)
            res.status(500).json({ message: message });
        else
            User.findOneAndUpdate({ address }, { $push: { scores: { "game": game, "score": score, "address": address, "timeStamp": Date.now() } } }).exec((err, document) => {
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