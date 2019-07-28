const express = require('express');
const userCtr = require('../controller/users');
const userMiddleware = require('../middleware/users');
const auth = require('../helpers/authenticat');

const route = express.Router();

route.post('/api/register', userMiddleware.validateUserExists, userMiddleware.validateNewUser, userCtr.signUp);
route.post('/api/login', userMiddleware.validateLogin, userCtr.Login)
route.get('/api/user/:id', userMiddleware.validateId, auth.authToken, auth.authUser, userCtr.getUser);

module.exports = route;