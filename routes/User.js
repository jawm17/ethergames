const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };

userRouter.post('/register', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(200).json({ message: { msgBody: "Account already exists", msgError: true } });
        else {
            const newUser = new User({ address });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }
    });
});

//gets user info
userRouter.post('/info', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(201).json({
                id: document._id,
                balance: document.balance,
                numTx: document.numTx,
                scores: document.scores
            });
        }
    });
});

//gets user info
userRouter.post('/numTx', (req, res) => {
    const { address } = req.body;
    User.findOne({address}).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({
                numTx: document.numTx
            });
        }
    });
});

//gets user info
userRouter.post('/balance', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({
                balance: document.balance
            });
        }
    });
});

// update user balance
userRouter.post('/update-balance', (req, res) => {
    const { address, funds } = req.body;
    User.findOneAndUpdate({ address }, { $inc: { balance: funds } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({
                balance: document.balance
            });
        }
    });
});

// update user balance
userRouter.post('/update-numTx', (req, res) => {
    const { address, numTx } = req.body;
    User.findOneAndUpdate({ address }, { numTx: numTx }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({ message: { msgBody: "Successfully updated balance", msgError: false } });
        }
    });
});

// send any type transaction
userRouter.post('/sendTransaction', (req, res) => {
    let message = { msgBody: "Error has occured", msgError: true };
    let funds = req.body.funds;
    let to = req.body.to;
    let from = req.body.from;
    let type = req.body.type;
    User.findOneAndUpdate({ "username": from }, { $inc: { balance: -(funds) }, $push: { sentTx: { "to": to, "amount": funds, "type": type, "timeStamp": Date.now() } } }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({ message: { msgBody: "Successfully sent ETH", msgError: false } });
        }
    });
});

module.exports = userRouter;