import type { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {

  await knex.schema
  // --- workouts -----------------
    .createTable('discord_credentials', table => {
      table.increments('id').primary()
      table.string('code')
      table.string('permissions')
      table.string('guild_id')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('deleted_at').index()
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists('discord_credentials')
}
