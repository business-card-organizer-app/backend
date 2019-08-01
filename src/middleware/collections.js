const Validator = require('validatorjs');
const response = require('../helpers/response');

module.exports = {
    validateCollection(req, res, next) {
        const {
            body
        } = req;
        let validator = new Validator(body, {
            user_id: 'required|numeric',
        });
        if (validator.fails()) {
            return response.errorHelper(res, 400, validator.errors.all())
        }
        next()
    }
}