require('dotenv').config();
// mongoose ODM
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// const mongoose = new Mongoose()
const mongoURI = process.env.DB_URL;

// connecting to db
const database = mongoose.connect(
    // 'mongodb://127.0.0.1:27017/test-db',
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (error) => {
        if (error) {
            console.log(`Connection to mongoDB failed\n${error}`);
        } else {
            console.log("Connected to monogoDB");
            // console.log(typeof mongoURI);
        }
    }
);

module.exports = database
