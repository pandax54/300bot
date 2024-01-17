import compose from 'koa-compose'
import type { Context } from 'koa'
import { getAllUsers } from '../../operations/v1/users/find-all'

export const findAll = compose([
  async (ctx: Context) => {
    const operationResult = await getAllUsers.execute({} as never)
    
    ctx.ok(operationResult)
  },
])

