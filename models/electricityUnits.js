const mongoose = require('mongoose');
const electricityUnitSchema = mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },
        unitPrice: {
            type: Number,
            default: 300,
        },
        availableUnits: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("ElectrictyUnits", electricityUnitSchema);
