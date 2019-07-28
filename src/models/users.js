const db = require('../data/dbConfig');

module.exports = {
    findUser(email) {
        return db('users')
            .where({
                email
            })
            .first()
            .then(ids => Object.keys(ids).length ? ids : null)
    },

    getUser(id) {
        if (id) {
            return db('users')
                .where({
                    id
                })
                .first()
                .then(ids => Object.keys(ids).length ? ids : null)
        }
    },

    validatePhone(phone) {
        return db('users')
            .where({
                phone
            })
            .first()
            .then(ids => Object.keys(ids).length ? ids : null)
    },

    addUser(user) {
        return db('users')
            .insert(user)
            .then(([id]) => id ? this.getUser(id) : null)
    }

}