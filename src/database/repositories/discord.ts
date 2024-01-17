import type {
  Transaction,
} from 'objection'
import { BaseRepository } from './base'
import { DiscordCredentials } from '../models/discord'



export class DiscordRepository extends BaseRepository<DiscordCredentials> {
  constructor(transaction?: Transaction) {
    super(DiscordCredentials, transaction)
  }
}

export const discordRepository = new DiscordRepository()
