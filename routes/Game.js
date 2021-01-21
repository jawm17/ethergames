const express = require('express');
const gameRouter = express.Router();
const passport = require('passport');
const Game = require('../models/Game');
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
gameRouter.post('/payment', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { amount, game } = req.body;
    Game.findOneAndUpdate({ name: game }, { $inc: { pot: amount } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            res.status(200).json({ message: { msgBody: "Successfully increased pot", msgError: false } });
        }
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