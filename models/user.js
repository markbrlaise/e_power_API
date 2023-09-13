const mongoose = require('mongoose');
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
        },
        account_number: {
            type: String,
            match: /^[0-9]{20}$/,
            unique: true,
            required: true
        },
        mobile_number: {
            type: String,
            match: /^[0-9]{10}$/,
            required: true,
        },
    },
    { timestamps: true } // to include createdAt and updatedAt
);
const User = mongoose.model("User", userSchema);

const adminSchema = new mongoose.Schema({
    adminRole: {
        type: String,
        required: true,
        default: 'admin',
    },
});

const Admin = User.discriminator('Admin', adminSchema);

module.exports = { User, Admin }
