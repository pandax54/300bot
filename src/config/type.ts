import { Env } from "@app/utils/enums"

const appEnv: Env = (process.env.NODE_ENV as Env) ?? Env.Local

export interface Config {
  appName: string
  env: Env

  logging: {
    stdout: {
      enabled: boolean
      level: string
      pretty: boolean
    }
    sensitiveParameters: string[]
  }

  discord: {
    clientId: string
    clientSecret: string
    aplicationId: string
    port: number
    redirectUri: string
  }

  server: {
    port: number
  }

  database: {
    url: string
  }
}