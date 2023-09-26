const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // expires: 3600,
        },
        expiresIn: {
            type: Number,
            default: 1200,
        }
    }
);


module.exports = mongoose.model("Token", tokenSchema);
