import config from '../config'
import { Env } from '../utils/enums'
import 'dotenv/config'
import type { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import { join } from 'path'

export interface KnexFileEnv {
  local: Knex.Config
  production: Knex.Config
}

const defaultOptions: Knex.Config = {
  debug: false,
  client: 'pg',
  connection: config.database.url,
  ...knexSnakeCaseMappers(),
  migrations: {
    directory: join(__dirname, './migrations'),
  },
  seeds: {
    directory: join(__dirname, './seeds'),
  },
}

const knexConfig: KnexFileEnv = {
  [Env.Local]: { 
    ...defaultOptions,
  },

  [Env.Production]: {
    ...defaultOptions,
    connection: {
      connectionString: config.database.url,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 2, max: 10 },
  },
}

export default knexConfig[config.env]
