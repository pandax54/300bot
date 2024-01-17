import type { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {

  await knex.schema
  // --- workouts -----------------
    .createTable('drawn', table => {
      table.increments('id').primary()
      table.integer('number_of_workouts').notNullable()
      table.integer('drawn_user_id').nullable()
      table.foreign('drawn_user_id').references('users.id')
      .onDelete('restrict')
      .onUpdate('restrict')
      table.string('prize').nullable()
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('deleted_at').index()
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists('drawn')
}