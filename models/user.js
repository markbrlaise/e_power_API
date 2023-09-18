const mongoose = require('mongoose');
const crypto = require('crypto');
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
        _account_number: {
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
        _role: {
            type: String,
            // required: true,
            default: 'user',
            select: false,
        }
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

userSchema.virtual('account_number').get(function () {
    return this._account_number;
});

userSchema.pre('save', function (next) {
    if (this.isModified('_role') || this.isModified('_account_number')) {
        return next(new Error('Cannot modify role and account_number directly'));
    }
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
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
