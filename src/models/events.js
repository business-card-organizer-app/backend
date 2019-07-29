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
            .then(([ids]) => Object.keys(ids).length ? ids : null)
    },

    updateEvent(id, event) {
        return db('events')
            .where({
                id
            })
            .update(event)
            .then(ids => {
                console.log(ids)
            })
    },

    deleteEvent(id) {
        const event = this.findEvents(id);
        return db('events')
            .where({
                id
            })
            .del()
            .then(() => event)
    }
}