exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([{
        first_name: 'Vince',
        last_name: 'Vince',
        email: 'nmereginivincent@gmail.com',
        password: '12345',
      }]);
    });
};