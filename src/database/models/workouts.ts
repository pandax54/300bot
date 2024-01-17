import { join } from 'path'
import type { RelationMappings } from 'objection'
import { Model } from 'objection'
import { BaseModel } from './base'
import { WorkoutCategory } from '../../utils/enums'

export class Workout extends BaseModel {
  static tableName = 'workouts'

  userId!: number
  description!: string
  category!: WorkoutCategory


  static relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, 'users'),
        join: {
          from: 'workouts.user_id',
          to: 'users.id',
        },
      },
    }
  }
}
