exports.up = function (knex) {
    return knex.schema.createTable('cards', tbl => {
        tbl.increments();
        tbl.string('qr_code')
            .unique()
            .notNullable();
        tbl.string('occupation')
            .notNullable();
        tbl.string('phone')
            .unique()
            .notNullable();
        tbl.timestamp('created_at', {
                precision: 6
            })
            .defaultTo(knex.fn.now(6));
        tbl.integer('user_id')
            .unique()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete("Cascade")
            .onUpdate('Cascade')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cards')
};