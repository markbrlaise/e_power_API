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
module.exports = mongoose.model("Transaction", transactionSchema);
