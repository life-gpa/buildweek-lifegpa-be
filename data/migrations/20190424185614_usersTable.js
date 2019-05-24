
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', user => {
    user.increments();
    user.string('username')
        .notNullable()
        .unique();

    user.string('password')
        .notNullable()

    user.timestamp('created_at').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
};
