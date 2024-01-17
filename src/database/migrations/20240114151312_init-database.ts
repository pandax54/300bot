import type { Knex } from 'knex'
import {
  UserRole,
  userRoleValues,
} from '../../utils/enums'

export async function up(knex: Knex): Promise<void> {

  await knex.schema
    // --- users -----------------
    .createTable('users', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.integer('goal').defaultTo(300)
      table.enu('role', userRoleValues).notNullable().defaultTo(UserRole.user)
      table.string('discord_id').notNullable()
      table.jsonb('discord_author')
      table.integer('initial_number_of_workouts').notNullable().defaultTo(0)
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('deleted_at').index()
    })
    

  await knex.schema
  // --- workouts -----------------
    .createTable('workouts', table => {
      table.increments('id').primary()
      table.string('category').notNullable().defaultTo('strength')
      table.string('description')
      table.string('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
      .onDelete('restrict')
      .onUpdate('restrict')
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
      table.dateTime('deleted_at').index()
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists('workouts')
    .dropTableIfExists('users')
}
