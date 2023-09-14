const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const userRoute = require('./routes/user');
const transactionRoute = require('./routes/transaction');
const mobileWalletRoute = require('./routes/mobileWallet');
const electricityUnitsRoute = require('./routes/electricityUnits');
const { Error } = require('mongoose');

// middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes to be handled
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/mobile-wallet', mobileWalletRoute);
app.use('/api/electricity-units', electricityUnitsRoute);

// handle error error requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error });
});

module.exports = app;
