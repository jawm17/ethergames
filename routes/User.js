const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };
const axios = require("axios");
const centralAddress = "0x5da2958A3f525A9093f1CC5e132DAe8522cc997c";

// CHECK FOR TXS SENT TO ADDRESS THAT ARE NOT REGISTERED!!!! ----------------------------------------------------------------
setInterval(async function () {
    try {
        const etherscanData = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${centralAddress}&startblock=0&endblock=99999999&sort=asc&apikey=8AAGX8PGJWQ9WDHYQ5N28SYKZ27ENKJ3VS`);
        let blockData = etherscanData.data;
        if (blockData.result.length > 0) {
            User.findOne({ "address": centralAddress }).exec((err, document) => {
                if (blockData.result.length > document.numTx) {
                    let incomingTxs = [];
                    // loop through new txs and push them to array
                    for (var i = blockData.result.length - 1; i >= document.numTx; i--) {
                        if (blockData.result[i].to.toUpperCase() === centralAddress.toUpperCase()) {
                            incomingTxs.push(blockData.result[i]);
                        }
                    }
                    // update each user balance 
                    incomingTxs.forEach(tx => {
                        var query = {"address": tx.from},
                            update = { $inc: { balance: parseFloat(tx.value / 1000000000000000000) }, "address": tx.from },
                            options = { upsert: true, new: true, setDefaultsOnInsert: true };

                        // Find the document
                        User.findOneAndUpdate(query, update, options, function (error, result) {
                            if (error) console.log("error updating eth balance");
                        });
                    });
                    // update txCount in db
                    User.findOneAndUpdate({ "address": centralAddress }, { numTx: blockData.result.length }).exec();
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}, 10000);

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
                document
            });
        }
    });
});

//gets user info
userRouter.post('/numTx', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }).exec((err, document) => {
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