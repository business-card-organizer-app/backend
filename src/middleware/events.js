const Events = require('../models/events');
const response = require('../helpers/response');
const validator = require('validator');

module.exports = {
    validateEvent(req, res, next) {
        const {
            body
        } = req;
        const hasrequiredField = 'name_event' && 'event_date' && 'event_venue' in body;
        if (!hasrequiredField) {
            return response.errorHelper(res, 400, "event name, date and venue are required")
        }
        next();
    }
}