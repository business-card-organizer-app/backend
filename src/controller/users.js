const Users = require('../models/users');
const response = require('../helpers/response');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../config/auth');

module.exports = {
    async signUp(req, res, next) {
        const {
            body
        } = req;
        try {
            body.password = await bcrypt.generateHash(body.password)
            const user = await Users.addUser(body)
            return response.successHelper(res, 201, user)
        } catch (error) {
            next({
                message: 'Error adding users try again'
            })
        }
    },

    async Login(req, res, next) {
        const {
            body
        } = req;
        try {
            const user = await Users.findUser(body.email)
            const comparePassword = await bcrypt.comparePassword(body.password, user.password);
            if (!user || !comparePassword) {
                return response.errorHelper(res, 401, 'Invalid credetianls')
            }
            const token = await jwt.generateToken(user)
            const {
                id,
                first_name,
                last_name,
                email,
                phone
            } = user
            const users = {
                id,
                first_name,
                last_name,
                email,
                phone,
                token
            }
            res.status(200).json({
                status: 200,
                data: [
                    users
                ]
            })
        } catch (error) {
            next({
                message: 'Error login users try again'
            })
        }
    },

    async getUser(req, res, next) {
        const {
            id
        } = req.params;
        try {
            const user = await Users.getUser(id);
            if (!user) {
                return response.errorHelper(res, 404, 'You are not a User')
            }
            const {
                first_name,
                last_name,
                email,
                phone
            } = user
            res.status(200).json({
                status: 200,
                data: [{
                    id,
                    first_name,
                    last_name,
                    email,
                    phone
                }]
            })
        } catch (error) {

        }
    }
}