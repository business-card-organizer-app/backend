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


}