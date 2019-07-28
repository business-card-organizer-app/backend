const Users = require('../models/users');
const response = require('../helpers/response');
const bcrypt = require('../helpers/bcrypt');

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
                message: 'Error adding users tryagain'
            })
        }
    }
}