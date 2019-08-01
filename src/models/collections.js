const db = require('../data/dbConfig');

module.exports = {
    findCardCollection(card_id) {
        if (card_id) {
            return db('card_collections')
                .select('*')
                .innerJoin('cards', 'card_id', 'cards.id')
                .innerJoin('users', 'card_collections.user_id', 'users.id')
                .leftJoin('events', 'event_id', 'events.id')
                .where({
                    card_id
                })
                .then(ids => ids.length ? ids : null)
        }
    },

    addCardCollection(card) {
        return db('card_collections')
            .insert(card)
            .returning('*')
            .then(ids => ids.length ? ids : null)
    },

    findUserCollection(user_id) {
        if (user_id) {
            return db('card_collections')
                .select('occupation', 'phone', 'name_event', 'event_date', 'event_venue', 'event_location')
                .innerJoin('users', 'card_collections.user_id', 'users.id')
                .innerJoin('cards', 'card_id', 'cards.id')
                .leftJoin('events', 'event_id', 'events.id')
                .where('card_collections.user_id', user_id)
                .then(ids => ids.length ? ids : null)
        }
    },

    validateCollection(user_id, card_id) {
        return db('card_collections')
            .where({
                user_id,
                card_id
            })
            .returning('*')
            .then(ids => ids.length ? ids : null)
    }
}