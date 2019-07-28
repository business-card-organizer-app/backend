const validator = require('validator');
const Users = require('../models/users');
const response = require('../helpers/response');

module.exports = {
    async validateUserExists(req, res, next) {
        const {
            email,
            phone
        } = req.body;
        try {
            const useremail = await Users.findUser(email);
            const userphone = await Users.validatePhone(phone)
            if (useremail || userphone) {
                return response.errorHelper(res, 400, 'User already exists')
            }
            next()
        } catch (error) {
            next({
                message: 'Error validating if user exists'
            })
        }
    },

    async validateNewUser(req, res, next) {
        const {
            body
        } = req;
        const hasRequiredField = 'email' && 'password' && 'phone' && 'first_name' && 'last_name' in body;
        if (!hasRequiredField) {
            return response.errorHelper(res, 400, "firstname, lastname, email phone and password are required")
        }
        const email = validator.isEmail(body.email);
        const password = validator.isLength(body.password, {
            min: 5
        });
        const phone = validator.isMobilePhone(body.phone);
        if (!email) {
            return response.errorHelper(res, 400, 'Invalid email type');
        } else if (!password) {
            return response.errorHelper(res, 400, 'Password must constain min of 5 characters');
        } else if (!phone) {
            return response.errorHelper(res, 400, 'Input a valid phone number')
        }
        next()
    }
}