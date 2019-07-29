const Events = require('../models/events');
const response = require('../helpers/response');

module.exports = {
    async registerEvent(req, res, next) {
        const {
            body
        } = req;
        try {
            const event = await Events.addEvent(body);
            return response.successHelper(res, 201, event)
        } catch (error) {
            next({
                message: "Error cannot add event"
            })
        }
    },

    async getAnEvent(req, res, next) {
        const {
            id
        } = req.params;
    }
}