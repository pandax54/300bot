import 'dotenv/config'
import { Config } from './type'
import { Env } from '@app/utils/enums'
const env = process.env.NODE_ENV ?? 'local'

export const getEnvironmentValue = (key: string, defaultValue?: string): string => {
  const envVal = process.env[key] ?? defaultValue

  if (!envVal) {
    throw new Error(`env variable ${key} has to be defined`)
  }

  return envVal
}

const config: Config = {
  appName: '300bot',

  database: {
    url: getEnvironmentValue('DATABASE_URL', 'postgres://postgres:postgres@localhost:5438/postgres'),
  },
  env: getEnvironmentValue('NODE_ENV', 'local') as Env,
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
      pretty: false,
    },
    sensitiveParameters: ['password'],
  },

  server: {
    port: Number(getEnvironmentValue('PORT', '3008')),
  },
}

export default config
