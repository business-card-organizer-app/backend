const Validator = require('validatorjs');
const response = require('../helpers/response');
const Collection = require('../models/collections');
const Cards = require('../models/cards');
const Events = require('../models/events');

module.exports = {
    async validateCollection(req, res, next) {
        const {
            body
        } = req;
        let validator = new Validator(body, {
            card_id: 'required|numeric',
        });
        if (validator.fails()) {
            return response.errorHelper(res, 400, validator.errors.all())
        }
        try {
            const {
                id
            } = req.params
            const {
                card_id
            } = req.body;
            const collection = await Collection.validateCollection(id, card_id);
            if (collection) {
                return response.errorHelper(res, 400, 'Already have these bussiness card')
            }
        } catch (error) {
            next({
                message: 'Error validating collections'
            })
        }
        next()
    },

    async validateCollectionsType(req, res, next) {
        const {
            card_id,
            event_id
        } = req.body;
        try {
            const card = await Cards.findCard(card_id);
            if (!card) {
                return response.errorHelper(res, 404, "Bussiness card does not exists")
            }
            if (event_id) {
                const event = await Events.findEvent(event_id);
                if (!event) {
                    return response.errorHelper(res, 404, "No such event")
                }
            }
            next()
        } catch (error) {
            next({
                message: 'Error validating collections'
            })
        }
    }
}