
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'rowValue1', password: 'asdfasd'},
        {id: 2, username: 'rowValue2', password: 'asdfasd'},
        {id: 3, username: 'rowValue3', password: 'asdfasd'}
      ]);
    });
};
