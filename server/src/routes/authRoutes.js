const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Stocks = mongoose.model('Stocks');
const router = express.Router();
const secret = require('../secret');

router.post('/signup', async (req, res) => {
    const {email, password, firstName} = req.body;
    try {
        const user = new User({email, password, firstName});
        await user.save();

        const token = jwt.sign({userId: user._id}, secret.secret_key);
        res.send({token});

        const stocks = new Stocks({userId: user._id, cash: 22, tickers: []});
        await stocks.save();
    } catch(err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(422).send({error: 'Must provide email and password'});

    const user = await User.findOne({ email });
    if(!user) return res.status(422).send({error: 'Invalid pass / email'});

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, secret.secret_key);
        res.send({token});
    } catch (err) {
        return res.status(422).send({error: 'Invalid pass / email'});
    }
})

module.exports = router;