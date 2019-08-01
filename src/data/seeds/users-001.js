exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([{
          first_name: 'Vince',
          last_name: 'Vince',
          email: 'nmereginivincent@gmail.com',
          password: '12345',
        },
        {
          first_name: 'Vince',
          last_name: 'Vince',
          email: 'nmereginivincentz@gmail.com',
          password: '12345',
        }
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('cards').insert([{
        qr_code: "https://www.google.com/facebook",
        occupation: "Software engineer",
        phone: "08097425294"
      }, ]);
    }).then(function () {
      // Inserts seed entries
      return knex('card_collections').insert([{
        card_id: 1,
        user_id: 1
      }]);
    })
};