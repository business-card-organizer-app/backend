const db = require('../data/dbConfig');

module.exports = {
    findUser(email) {
        return db('users')
            .where({
                email
            })
            .returning('*')
            .then(ids => ids.length ? ids : null)
    },

    getUser(id) {
        if (id) {
            return db('users')
                .where({
                    id
                })
                .returning('*')
                .then(ids => ids.length ? ids : null)
        }
    },

    addUser(user) {
        const {
            first_name,
            last_name,
            email,
        } = user
        const users = {
            first_name,
            last_name,
            email
        }
        return db('users')
            .insert(user)
            .returning('*')
            .then(() => users)
    },

    updateUser(user_image, id) {
        return db('users')
            .update({
                user_image
            })
            .where({
                id
            })
            .returning(['first_name', 'last_name', 'email', 'user_image'])
            .then(res => res.length ? res : null)
    }

}