// mongoose ODM
const mongoose = require('mongoose');

// connecting to db
const database = mongoose.connect(
    process.env.DB_URL,
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
        }
    }
);