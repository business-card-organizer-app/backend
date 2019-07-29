const db = require('../data/dbConfig');

module.exports = {
    findEvents(user_id) {
        if (user_id) {
            return db('events')
                .where({
                    user_id
                })
                .then((ids) => {
                    if (ids.length) {
                        return ids
                    } else {
                        return null
                    }
                })
        };
        return db('events');
    },

    addEvent(event) {
        return db('events')
            .insert(event)
            .returning('*')
            .then((ids) => ids.length ? ids : null)
    },

    updateEvent(id, event, user_id) {
        return db('events')
            .where({
                id
            })
            .update(event)
            .then(ids => ids ? this.findEvents(user_id) : null)
    },

    deleteEvent(event_id) {
        return db('events')
            .where({
                id: event_id
            })
            .del()
            .returning('*')
            .then((res) => res.length ? res : null)
    }
}