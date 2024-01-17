import type {
  ArrayQueryBuilder,
  MaybeSingleQueryBuilder,
  ModelClass,
  QueryBuilderType,
  SingleQueryBuilder,
  Transaction,
} from 'objection'
import type { BaseModel } from '../models/base'

export interface PaginationOptions {
  page: number
  pageSize: number
}

export interface OrderOptions {
  column: string
  direction: 'asc' | 'desc'
}

export class BaseRepository<T extends BaseModel> {
  model: ModelClass<T>
  protected transaction?: Transaction

  constructor(model: ModelClass<T>, transaction?: Transaction) {
    this.model = model
    this.transaction = transaction
  }

  query(): QueryBuilderType<T> {
    return this.model.query(this.transaction)
  }

  insert(data: object): SingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().insertAndFetch(data)
  }

  findAll(): ArrayQueryBuilder<QueryBuilderType<T>> {
    return this.query()
  }

  findOneBy(query: object): MaybeSingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().findOne({ ...query })
  }

  findById(id: number): MaybeSingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().findById(id)
  }

  patchById(id: number, data: object): SingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().updateAndFetchById(id, data)
  }

}

