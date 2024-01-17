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

  discord: {
    clientId: getEnvironmentValue('PUBLIC_KEY', '123'),
    clientSecret: getEnvironmentValue('CLIENT_TOKEN', '123'),
    aplicationId: getEnvironmentValue('APPLICATION_ID', '123'),
    port: Number(getEnvironmentValue('DISCORD_PORT', '3008')),
    redirectUri: getEnvironmentValue('REDIRECT_URI', 'http://localhost:3008/connect'),
  },

  server: {
    port: Number(getEnvironmentValue('PORT', '3008')),
  },
}

export default config
