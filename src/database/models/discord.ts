import { BaseModel } from './base'


export class DiscordCredentials extends BaseModel {
  static tableName = 'discord_credentials'

  code!: string
  permissions!: string
  guildId!: string
  
}
