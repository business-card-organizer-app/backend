const express = require('express');
const eventCtr = require('../controller/events');
const auth = require('../helpers/authenticat');
const eventMidlw = require('../middleware/events');
const userMidlw = require('../middleware/users');

const route = express.Router();

route.post('/api/user/event', auth.authToken, auth.authUser, eventMidlw.validateEvent, eventCtr.registerEvent);

module.exports = route;