const jwt = require('jsonwebtoken');
const secret = require('./secrets');

module.exports = {
    generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.email
        }
        const options = {
            expiresIn: '1d'
        }
        return jwt.sign(payload, secret.jwtSecret, options)
    },

    decodeToken(token) {
        return jwt.verify(token, secret.jwtSecret);
    }
}