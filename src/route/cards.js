const express = require('express');
const cardsMidle = require('../middleware/cards');
const cardCtr = require('../controller/cards');
const userMidle = require('../middleware/users');
const auth = require('../helpers/authenticat');

const route = express.Router();
route.post('/api/user/:id/card', auth.authToken, auth.authUser, userMidle.validateId, cardsMidle.validateCardExist, cardsMidle.validateCardRequest, cardCtr.generateBusiness);

module.exports = route;