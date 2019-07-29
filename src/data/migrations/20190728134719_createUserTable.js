exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('first_name')
            .notNullable()
        tbl.string('last_name')
            .notNullable()
        tbl.text('email')
            .unique()
            .notNullable()
        tbl.text('password')
            .notNullable()
        tbl.text('phone')
            .notNullable()
            .unique()
        tbl.text('qr_code')
        tbl.text('user_image')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};