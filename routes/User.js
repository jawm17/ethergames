const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);


const signToken = userID => {
    return JWT.sign({
        iss: "crackPotHippie",
        sub: userID
    }, "crackPotHippie", { expiresIn: "48h" });
}

// register new user
userRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    const message = { msgBody: "Error has occured", msgError: true };

    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message });
        if (user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else {
            const account = web3.eth.accounts.create();
            const address = account.address;
            const key = account.privateKey;
            const newUser = new User({ username, password, address, key });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }
    });
});

// post login credentials
userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

//logout
userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
});

module.exports = userRouter;