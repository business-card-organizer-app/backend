exports.up = function (knex) {
    return knex.schema.createTable('card_collections', tbl => {
        tbl.increments();
        tbl.unique(['user_id', 'card_id'])
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('Cascade')
            .onUpdate('Cascade')
        tbl.integer('card_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('cards')
            .onDelete('Cascade')
            .onUpdate('Cascade')
        tbl.integer('event_id')
            .unsigned()
            .references('id')
            .inTable('events')
            .onDelete('Cascade')
            .onUpdate('Cascade')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('card_collections')
};