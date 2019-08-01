const express = require('express');
const userCtr = require('../controller/users');
const userMiddleware = require('../middleware/users');
const auth = require('../helpers/authenticat');
const parser = require('../config/cloudinary');

const route = express.Router();

route.post('/api/register', userMiddleware.validateNewUser, userMiddleware.validateUserExists, userCtr.signUp);
route.post('/api/login', userMiddleware.validateLogin, userCtr.Login)
route.get('/api/user/:id', userMiddleware.validateId, auth.authToken, auth.authUser, userCtr.getUser);
route.patch('/api/user/:id/image', userMiddleware.validateId, auth.authToken, auth.authUser, parser, userCtr.uploadImage);

module.exports = route;