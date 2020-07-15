const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Stocks = mongoose.model('Stocks');

const router = express.Router();
router.use(requireAuth);

router.get('/fetchAllStocks', async (req, res) => {
    const stocks = await Stocks.find({userId: req.user._id});
    res.send(stocks);
});

router.post('/newStock', requireAuth, async(req, res)=>{
    //TODO: req.user._id not being recognized
    const {symbol, price, shares} = req.body;
    const newTicker = {symbol: symbol, buyInPrice: price, sharesOwned: shares};
    try {
        await Stocks.findOne({userId: req.user._id}, async function(err, tickers){
            tickers.tickers = [...tickers.tickers,newTicker];
            await tickers.save();
            res.send(`Added stock ${symbol} to collection!`);
        });
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;
