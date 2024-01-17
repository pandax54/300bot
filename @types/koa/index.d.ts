import * as Koa from 'koa'
import { User } from '@models/user'

type BodyObject = { [key: string]: string }

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body: BodyObject
    user: User
  }

  interface Context extends Koa.BaseContext {
    params: { [key: string]: string }
    query: {
      [key: string]: string | string[]
      orderDirection?: 'asc' | 'desc'
    }

    request: Request

    valid: { body?: any, query?: any, params?: any }
    ok(payload: any): any
    created(payload: any): any
    noContent(payload?: any): any
    badRequest(payload: any): any
    unauthorized(payload: any): any
    forbidden(payload: any): any
    notFound(payload: any): any
    internalServerError(payload: any): any
  }
}
