const Validator = require('validatorjs');
const validate = require('validator');
const Card = require('../models/cards');
const response = require('../helpers/response');

module.exports = {
    validateCardRequest(req, res, next) {
        const {
            body
        } = req;
        const rules = {
            qr_code: 'required|string|min:5|url',
            occupation: 'required|string|min:2',
            phone: 'required'
        }
        let validator = new Validator(body, rules);
        if (validator.fails()) {
            return response.errorHelper(res, 400, validator.errors.all())
        }
        if (!validate.isMobilePhone(body.phone)) {
            return response.errorHelper(res, 400, 'Invalid phone number')
        }
        next()
    },

    async validateCardExist(req, res, next) {
        const {
            id
        } = req.params;
        try {
            const card = await Card.findUserCard(id);
            if (card) {
                return response.errorHelper(res, 400, "You already have a virtual card")
            }
            next()
        } catch (error) {
            next({
                message: "Error checking cards"
            })
        }
    },

    async validateUpdateCard(req, res, next) {
        const {
            id
        } = req.params;
        try {
            const card = await Card.findUserCard(id);
            if (!card) {
                return response.errorHelper(res, 404, "You don't have a virtual card")
            }
            next()
        } catch (error) {
            next({
                message: "Error checking cards"
            })
        }
    }
}