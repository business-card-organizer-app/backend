const validator = require('validator');
const Users = require('../models/users');
const response = require('../helpers/response');

module.exports = {
    async validateUserExists(req, res, next) {
        const {
            email
        } = req.body;
        try {
            const useremail = await Users.findUser(email);
            if (useremail) {
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
        const {
            email,
            password,
            first_name,
            last_name
        } = body
        if (!email || !password || !first_name || !last_name) {
            return response.errorHelper(res, 400, "firstname, lastname, email and password are required")
        }
        const useremail = validator.isEmail(body.email);
        const userpassword = validator.isLength(body.password, {
            min: 5
        });
        if (!useremail) {
            return response.errorHelper(res, 400, 'Invalid email type');
        } else if (!userpassword) {
            return response.errorHelper(res, 400, 'Password must constain min of 5 characters');
        }
        next()
    },

    async validateLogin(req, res, next) {
        const {
            body
        } = req;
        const hasRequiredField = 'email' && 'password' in body;
        if (!hasRequiredField) {
            return response.errorHelper(res, 400, 'email and password are required')
        }
        const email = validator.isEmail(body.email);
        if (!email) {
            return response.errorHelper(res, 400, 'Invalid email type');
        }
        next()
    },

    async validateId(req, res, next) {
        const {
            id
        } = req.params;
        if (!id) {
            return response.errorHelper(res, 400, 'Id is needed')
        } else if (!Number(id)) {
            return response.errorHelper(res, 400, 'Invalid id type')
        }
        next()
    }
}