const mongoose = require('mongoose');

const tickerSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    buyInPrice: {
        type: Number,
        required: true
    },
    sharesOwned: {
        type: Number,
        required: true
    }
})

const stocksSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    cash: {
        type: Number,
    },
    tickers: [tickerSchema]
});

mongoose.model('Stocks', stocksSchema);
