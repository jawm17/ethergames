const express = require('express');
const accountRouter = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };


// remove route during production
accountRouter.post('/newgame', (req, res) => {
    User.findOne({ address }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else {
            const account = web3.eth.accounts.create();
            const address = account.address;
            const key = account.privateKey;
            const balance = 0.0023;
            User.countDocuments({}, function (err, c) {
                if (c <= 52) {
                    const newUser = new User({ username, password, address, key, balance });
                    newUser.save(err => {
                        if (err)
                            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                        else
                            res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
                    });
                } else {
                    const newUser = new User({ username, password, address, key });
                    newUser.save(err => {
                        if (err)
                            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                        else
                            res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
                    });
                }
            });
        }
    });
});

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