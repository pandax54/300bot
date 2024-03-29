import compose from 'koa-compose'
import type { Context } from 'koa'
import type { Input as OauthConnectInput } from '../../operations/v1/oauth/connect'
import { oauthConnect } from '../../operations/v1/oauth/connect'
import { logger } from '../../utils/logger'

export const connect = compose([
  async (ctx: Context): Promise<void> => {
    logger.info('ctx.request.query', ctx.request.query)
    const inputData: Partial<OauthConnectInput> = {
      code: ctx.request.query.code as string,
      permissions: ctx.request.query.permissions as string,
      guildId: ctx.request.query.guild_id as string,
    }

    const operationResult = await oauthConnect.execute(inputData)
    logger.info(operationResult)
    ctx.ok(operationResult)
  },
])
