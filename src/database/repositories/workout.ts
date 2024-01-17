import type {
  Page,
  QueryBuilder,
  Transaction,
} from 'objection'
import type { OrderOptions, PaginationOptions } from './base'
import { BaseRepository } from './base'
import { Workout } from '../models/workouts'

export interface WorkoutsOrderOptions extends OrderOptions {
  // e.g. id, createdAt, email
  column: string
}

export interface FilterOptions {
  order: WorkoutsOrderOptions
  pagination: PaginationOptions
}

export interface PaginatedWorkoutsList {
  total: number
  results: Workout[]
}

export class WorkoutRepository extends BaseRepository<Workout> {
  constructor(transaction?: Transaction) {
    super(Workout, transaction)
  }

  findForAdmin(options: FilterOptions): QueryBuilder<Workout, Page<Workout>> {
    const { order, pagination } = options

    return this.findAll()
      .orderBy(order.column, order.direction)
      .page(pagination.page, pagination.pageSize)
  }

  findByUserIdAndDate(userId: number): Promise<Workout | undefined> {
    // @ts-ignore
    return this.findAll().where({ userId })
    .orderBy('created_at', 'desc')
    .first()
  }
}

export const workoutRepository = new WorkoutRepository()
