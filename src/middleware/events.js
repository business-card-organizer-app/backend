const Events = require('../models/events');
const response = require('../helpers/response');
const validator = require('validator');
const Users = require('../models/users');

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
    },

    async validateUser(req, res, next) {
        const user = await Users.getUser(req.params.id);
        if (!user) {
            return response.errorHelper(res, 404, "User doesn't exists")
        }
        next()
    }
}