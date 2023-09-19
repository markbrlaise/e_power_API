const express = require('express');
// import express from "express";
const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
const cors = require('cors');
// import cors from 'cors';
// import database from './database/db.js'; // Import your database setup
const database = require('./database/db.js');
const cookieParser = require('cookie-parser');

const yaml = require('js-yaml');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

require('dotenv').config();

const app = express();

const http = require('http');

const server = http.createServer(function (req, res) {
    res.write("Success");
    res.end();
});

const userRoute = require('./routes/user');
const transactionRoute = require('./routes/transaction.js');
const mobileWalletRoute = require('./routes/mobileWallet.js');
const electricityUnitsRoute = require('./routes/electricityUnits.js');

// Middleware to parse incoming requests
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());
app.use(cookieParser);

// Routes to be handled
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/mobile-wallet', mobileWalletRoute);
app.use('/api/electricity-units', electricityUnitsRoute);

// Handle error requests
// app.use((req, res, next) => {
//     const error = new Error();
//     error.message = 'Not Found';
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500).json({ error: error });
// });

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on ${process.env.BASE_URL}:${port}`);
    return res.status(200).json({ message: "It works" });
});

// export default function app(req, res) {
//     return res.status(200).json({ message: "It works" });
// }

module.exports = app;
