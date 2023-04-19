/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('livros', function(table) {
      table.integer('userId').unsigned();
      table.foreign('userId').references('id').inTable('users');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('livros', function(table) {
      table.dropForeign('userId');
      table.dropColumn('userId');
    });
  };
  