const Events = require('../models/events');
const response = require('../helpers/response');
const validator = require('validatorjs');
const Users = require('../models/users');

module.exports = {
    validateEvent(req, res, next) {
        const {
            body
        } = req;
        let validation = new validator(body, {
            name_event: 'required|string',
            event_date: 'required|string',
            event_venue: 'required|string'
        });
        if (validation.fails()) {
            const err = validation.errors.all()
            return response.errorHelper(res, 400, err)
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