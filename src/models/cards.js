const db = require('../data/dbConfig');

module.exports = {
    findUserCard(user_id) {
        return db('cards')
            .where({
                user_id
            })
            .first()
    },

    generateCard(user_id, card) {
        return db('cards')
            .insert({
                ...card,
                user_id
            })
            .returning('qr_code')
            .then((ids) => ids.length ? ids : null)
    },


}