const db = require('../data/dbConfig');

module.exports = {
    findUserCard(user_id) {
        return db('cards')
            .where({
                user_id
            })
            .returning('*')
            .then(card => card.length ? card : null)
    },

    generateCard(user_id, card) {
        return db('cards')
            .insert({
                ...card,
                user_id
            })
            .returning('*')
            .then((ids) => ids.length ? ids : null)
    },

    updateCard(user_id, card) {
        return db('cards')
            .where({
                user_id
            })
            .update(card)
            .returning('*')
            .then((ids) => ids.length ? ids : null)
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

    findCard(id) {
        return db('cards')
            .where({
                id
            })
            .returning('*')
            .then(ids => ids.length ? ids : null)
    }
}