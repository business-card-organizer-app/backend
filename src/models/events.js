const db = require('../data/dbConfig');

module.exports = {
    findEvents(id) {
        if (id) {
            return db('events')
                .where({
                    id
                })
                .first()
                .then(ids => ids ? ids : null)
        };
        return db('events');
    },

    addEvent(event) {
        return db('events')
            .insert(event)
            .returning('*')
            .then((ids) => ids.length ? ids : null)
    },

    updateEvent(id, event) {
        return db('events')
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