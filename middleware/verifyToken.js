const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
require('dotenv').config();

function verifyUser(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    // console.log(token);

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

function verifyAdmin(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    // console.log(token)

    try {
        verified = jwt.verify(token, process.env.SECRET_KEY);
        if (verified.role === 'admin') {
            req.user = verified;
            next();
        } else {
            return res.status(403).json({ message: 'Access denied for non-admin users' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

module.exports = { verifyUser, verifyAdmin };
