const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema(
    {
        // transactionType
        transactionType: {
            type: String,
            required: true,
        },
        // userId
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // electricityUnits
        electricityUnits: {
            type: Number,
            default: 0,
        },
        // transactionAmount
        transactionAmount: {
            type: Number,
            default: 0,
        },
        // transactionStatus
        transactionStatus: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
