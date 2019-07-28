const db = require('../data/dbConfig');

module.exports = {
    findUser(email) {
        return db('users')
            .where({
                email
            })
            .first()
            .then(ids => ids ? ids : null)
    },

    getUser(id) {
        if (id) {
            return db('users')
                .where({
                    id
                })
                .first()
                .then(ids => ids ? ids : null)
        }
    },

    validatePhone(phone) {
        return db('users')
            .where({
                phone
            })
            .first()
            .then(ids => ids ? ids : null)
    },

    addUser(user) {
        const {
            first_name,
            last_name,
            email,
            phone
        } = user
        const users = {
            first_name,
            last_name,
            email,
            phone
        }
        return db('users')
            .insert(user)
            .returning('id')
            .then(() => users)
    }

}