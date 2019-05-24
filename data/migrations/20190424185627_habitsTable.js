
exports.up = function(knex, Promise) {
    return knex.schema.createTable('habits', habit => {
        habit.increments()
            .unsigned();

        habit.string('habit_name')
            .notNullable();

        habit.decimal('score', 3,2)
            .unsigned()
            .notNullable();

        habit.integer('user_id')
            .unsigned()
            .notNullable();

        habit.foreign('user_id')
            .references('id')
            .inTable('user');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('habits')
};
