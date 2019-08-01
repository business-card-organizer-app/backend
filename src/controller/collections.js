const Collections = require('../models/collections');
const response = require('../helpers/response');

module.exports = {
    async getCardCollection(req, res, next) {
        try {
            const {
                card_id
            } = req.params;
            const collection = await Collections.findCardCollection(card_id);
            return response.successHelper(res, 200, collection)
        } catch (error) {
            next({
                message: "Error getting card"
            })
        }
    },

    async addCardCollection(req, res, next) {
        try {
            const {
                id
            } = req.params;
            const {
                body
            } = req;
            const collection = await Collections.addCardCollection({
                ...body,
                user_id: id
            });
            if (!collection) {
                return response.errorHelper(res, 400, 'You already have these card');
            }
            return response.successHelper(res, 201, collection)
        } catch (error) {
            console.log(error.message)
            next({
                message: "Error adding card"
            })
        }
    },

    async getUserCollection(req, res, next) {
        try {
            const {
                id
            } = req.params;
            const collection = await Collections.findUserCollection(id);
            if (!collection) {
                return response.errorHelper(res, 404, "No cards in your collection")
            }
            return response.successHelper(res, 200, collection)
        } catch (error) {
            next({
                message: "Error getting card in your collections"
            })
        }
    },
}