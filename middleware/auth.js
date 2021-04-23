const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token');

    //check for no token
    if (!token) {
        res.status(401).json({ msg: 'Token not found, access denied' });
    }

    //token authenticate
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Access Denied, Invalid Token' })
    }
}