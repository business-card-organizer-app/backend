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
            .then(([ids]) => Object.keys(ids).length ? ids : null)
    },

    updateCard(user_id, card) {
        return db('cards')
            .where({
                user_id
            })
            .update(card)
            .returning('qr_code')
            .then((ids) => {
                console.log(ids)
            })
    },

    deleteCard(user_id) {
        const card = this.findUserCard(user_id);
        return db('cards')
            .where({
                user_id
            })
            .del()
            .then(() => card)
    },
}