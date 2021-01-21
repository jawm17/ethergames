const express = require('express');
const gameRouter = express.Router();
const Game = require('../models/Game');

gameRouter.post('/newgame', (req, res) => {
    const { name, samplePic } = req.body;
    const newGame = new Game({ name, samplePic });
    newGame.save(err => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else
            res.status(201).json({ message: { msgBody: "Game successfully created", msgError: false } });
    });
});

gameRouter.post('/payment', (req, res) => {
    const { amount, game } = req.body;
    Game.findOneAndUpdate({ name: game }, { $inc: { pot: amount } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({ message: { msgBody: "Successfully increased pot", msgError: false } });
        }
    });
});

module.exports = gameRouter;