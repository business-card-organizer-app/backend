const Events = require('../models/events');
const response = require('../helpers/response');

module.exports = {
    async registerEvent(req, res, next) {
        const {
            body
        } = req;
        const {
            id
        } = req.params;
        try {
            const event = await Events.addEvent({
                ...body,
                user_id: id
            });
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