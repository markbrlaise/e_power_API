const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

function verifyUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

function verifyAdmin(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

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
