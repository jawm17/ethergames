const express = require('express');
const accountRouter = express.Router();
const Game = require('../models/Game');
const message = { msgBody: "Error has occured", msgError: true };

// get info for req.params.game
accountRouter.get('/info/:game', (req, res) => {
    Game.findOne({ "name": req.params.game }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message: message });
        }
        else {
            res.status(200).json({ name: document.name, img: document.samplePic, scores: document.scores, pot: document.pot });
        }
    });
});

module.exports = accountRouter;