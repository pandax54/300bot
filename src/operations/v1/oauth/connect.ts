
import { Operation } from '../../operations'
import { DiscordCredentials } from '../../../database/models/discord'
import { discordRepository } from '../../../database/repositories/discord'

export type Input = Partial<DiscordCredentials>

class OauthConnect extends Operation<Input, void> {
  protected async run(requestData: Input): Promise<void> {
    const { code, permissions, guildId } = requestData
  
    await discordRepository.insert({
      code,
      permissions,
      guild_id: guildId,
    })
  }
}

export const oauthConnect = new OauthConnect()
