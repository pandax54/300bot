import type {
  MaybeSingleQueryBuilder,
  Page,
  QueryBuilder,
  QueryBuilderType,
  Transaction,
} from 'objection'
import { User } from '../models/users'
import type { OrderOptions, PaginationOptions } from './base'
import { BaseRepository } from './base'

export interface UserOrderOptions extends OrderOptions {
  // e.g. id, createdAt, email
  column: string
}

export interface FilterOptions {
  order: UserOrderOptions
  pagination: PaginationOptions
}

export interface PaginatedUserList {
  total: number
  results: User[]
}

export class UserRepository extends BaseRepository<User> {
  constructor(transaction?: Transaction) {
    super(User, transaction)
  }

  findAllWithWorkouts(): QueryBuilder<User, User[]> {
    // show virtual attributes
    return this.query().withGraphFetched('workouts')
  }

  findByEmail(email: string): MaybeSingleQueryBuilder<QueryBuilderType<User>> {
    return this.findOneBy({ email })
  }

  findByDiscordId(discord_id: string): MaybeSingleQueryBuilder<QueryBuilderType<User>> {
    return this.findOneBy({ 'discordId': discord_id }).withGraphFetched('workouts')
  }
 
  findForAdmin(options: FilterOptions): QueryBuilder<User, Page<User>> {
    const { order, pagination } = options

    return this.findAll()
      .orderBy(order.column, order.direction)
      .page(pagination.page, pagination.pageSize)
  }
}

export const userRepository = new UserRepository()
