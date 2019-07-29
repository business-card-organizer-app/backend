const express = require('express');
const eventCtr = require('../controller/events');
const auth = require('../helpers/authenticat');
const eventMidlw = require('../middleware/events');
const userMidlw = require('../middleware/users');

const route = express.Router();

route.post('/api/user/:id/event', auth.authToken, auth.authUser, userMidlw.validateId, eventMidlw.validateUser, eventMidlw.validateEvent, eventCtr.registerEvent);
route.get('/api/user/:id/event', auth.authToken, auth.authUser, userMidlw.validateId, eventMidlw.validateUser, eventCtr.getAnEvent)

module.exports = route;