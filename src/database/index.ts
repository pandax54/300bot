import type { Knex as KnexType } from 'knex'
import Knex from 'knex'
import knexConfig from './config'
import config from '../config'
import { Model } from 'objection'
import { logger } from '../utils/logger'

interface QueryData {
  sql: string
  bindings: string
}

export const initializeDb = async (): Promise<KnexType> => {
  // !knexConfig.hasOwnProperty(config.env)
  if (!knexConfig) {
    throw new Error(`Your knexfile is missing section '${config.env}'`)
  }

  // Initialize knex.
  const knex = Knex(knexConfig) // eslint-disable-line new-cap

  // Test connection
  try {
    await knex.raw('select 1+1 as result')
  } catch (error) {
    const errorMessage = `DB connection failed with error: ${String(error)}`
    logger.fatal(errorMessage)
    throw error instanceof Error ? error : new Error(errorMessage)
  }

  knex.on('query', (queryData: QueryData) => {
    logger.debug({ sql: queryData.sql, params: queryData.bindings }, 'DB')
  })

  Model.knex(knex)
  knex.migrate.latest()

  logger.info('DB connection initialized')

  return knex
}