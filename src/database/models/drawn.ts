import { join } from 'path'
import type { RelationMappings } from 'objection'
import { Model } from 'objection'
import { BaseModel } from './base'

export class Drawn extends BaseModel {
  static tableName = 'drawns'

  drawn_user_id!: number
  number_of_workouts!: number
  prize!: string
  

  static relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, 'users'),
        join: {
          from: 'drawns.drawn_user_id',
          to: 'users.id',
        },
      },
    }
  }
}
