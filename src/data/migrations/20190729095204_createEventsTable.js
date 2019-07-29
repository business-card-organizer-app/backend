exports.up = function (knex) {
    return knex.schema.createTable('events', tbl => {
        tbl.increments();
        tbl.text('name_event')
            .notNullable()
        tbl.date('event_date')
            .notNullable()
        tbl.text('event_venue')
            .notNullable()
        tbl.text('event_location')
        tbl.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete("Cascade")
            .onUpdate('Cascade')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('events')
};