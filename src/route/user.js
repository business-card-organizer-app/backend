const express = require('express');
const userCtr = require('../controller/users');
const userMiddleware = require('../middleware/users');

const route = express.Router();

route.post('/api/register', userMiddleware.validateUserExists, userMiddleware.validateNewUser, userCtr.signUp);

module.exports = route;