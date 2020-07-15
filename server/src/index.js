require('./models/User');
require('./models/Stocks');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const stocksRoutes = require('./routes/stocksRoutes');
const secret = require('./secret');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(stocksRoutes);

const mongoUri = secret.mongoUri;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Instance');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Hello ${req.user.firstName}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
    console.log(secret.pass);
});