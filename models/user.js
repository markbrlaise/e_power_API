const mongoose = require('mongoose');
const crypto = require('crypto');
const MobileWallet = require('../models/mobileWallet');
const ElectrictyUnits = require('../models/electricityUnits');
const userSchema = new mongoose.Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        account_number: {
            type: String,
            match: /^[0-9]{20}$/,
            unique: true,
            required: true,
            immutable: true,
            // making account_number read only after creation
            // set: function(value) {
            //     if (this.isNew) {
            //         return value;
            //     } else {
            //         return this.account_number;
            //     }
            // }
        },
        mobile_number: {
            type: String,
            match: /^[0-9]{10}$/,
            required: true,
        },
        _role: {
            type: String,
            // required: true,
            default: 'user',
            select: false,
        },
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    },
    { timestamps: true } // to include createdAt and updatedAt
);

// defining virtual getters
userSchema.virtual('role')
    .get(function () {
        return this._role;
    })
    .set(function (newRole) {
        if (this._role === 'admin') {
            this._role = newRole
        }
    });

userSchema.pre('save', function (next) {
    if (this.isModified('_role')) {
        return next(new Error('Cannot modify role directly'));
    }
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
    next();
});

userSchema.pre('remove', async function(next) {
    await MobileWallet.deleteOne({ userId: this._id });
    await ElectrictyUnits.deleteOne({ userId: this._id });
    next();
});

const User = mongoose.model("User", userSchema);

// const adminSchema = new mongoose.Schema({
//     adminRole: {
//         type: String,
//         required: true,
//         default: 'admin',
//     },
// });

// const Admin = User.discriminator('Admin', adminSchema);

module.exports = User; //, Admin }
