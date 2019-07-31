const jwt = require('../config/auth');
const response = require('./response');
const Users = require('../models/users');

module.exports = {
    async authToken(req, res, next) {
        const {
            token
        } = req.headers;
        if (!token) {
            return response.errorHelper(res, 401, 'token is required')
        }
        try {
            const check = await jwt.decodeToken(token);
            req.token = check;
            next()
        } catch (error) {
            return response.errorHelper(res, 401, 'invalid token')
        }
    },

    async authUser(req, res, next) {
        const {
            token
        } = req;
        const {
            subject,
            username
        } = token;
        try {
            const [user] = await Users.getUser(subject);
            if (!user || username !== user.email) {
                return response.errorHelper(res, 401, 'Invalid User Token')
            }
            next()
        } catch (error) {
            next({
                message: "Error authenticating user"
            })
        }
    }
}