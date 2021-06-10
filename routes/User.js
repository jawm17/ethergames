const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');
const message = { msgBody: "Error has occured", msgError: true };
const axios = require("axios");
const centralAddress = "0x5da2958A3f525A9093f1CC5e132DAe8522cc997c";

// Records new txs sent to central address each 10 seconds ----------------------------------------------------------------
setInterval(async function () {
    try {
        const etherscanData = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${centralAddress}&startblock=0&endblock=99999999&sort=asc&apikey=8AAGX8PGJWQ9WDHYQ5N28SYKZ27ENKJ3VS`, {
            headers: {
                "User-Agent": "PostmanRuntime/7.17.1",
                "Accept": "/",
                "Cache-Control": "no-cache",
                "Postman-Token": "267dd7be-7f3f-4d67-a51c-05152aa8e8fc,8f8b84b0-3df1-4656-9480-c31e99d270d2",
                "Host": "api-rinkeby.etherscan.io",
                "Accept-Encoding": "gzip, deflate",
                "Cookie": "__cfduid=d33064099a72a08ae6f9197c790da62d21569724532",
                "Connection": "keep-alive",
                "cache-control": "no-cache"
            }
        });
        let blockData = etherscanData.data;
        if (blockData && blockData.status == 1) {
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
                        var query = { "address": tx.from },
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
        } else {
            // no block data / etherscan error
            console.log("no block data / etherscan error STATUS: " + blockData.status)
            console.log(blockData);
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
            res.status(200).json({ message: { msgBody: "Account already exists", msgError: false } });
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
        if (document) {
            res.status(201).json({
                document
            });
        }
        else {
            res.status(500).json({ message });
        }
    });
});

//gets user info
userRouter.post('/numTx', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }).exec((err, document) => {
        if (document.numTx) {
            res.status(200).json({
                numTx: document.numTx
            });
        }
        else {
            res.status(500).json({ message });
        }
    });
});

//gets user info
userRouter.post('/balance', (req, res) => {
    const { address } = req.body;
    User.findOne({ address }).exec((err, document) => {
        if (document.balance) {
            res.status(200).json({
                balance: document.balance
            });
        }
        else {
            res.status(500).json({ message });
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