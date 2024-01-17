import type * as jsonschema from 'jsonschema'
import * as uuidGen from 'uuid'
import { logger } from '../utils/logger'
import { ApiError } from '../utils/errors'

export abstract class Operation<IN extends object, OUT> {
  protected validationSchema?: jsonschema.Schema

  async execute(inputData: IN): Promise<OUT> {
    const uuid = uuidGen.v1()
    logger.info(
      `${uuid}(${this.constructor.name}) - START EXECUTING... with payload: `,
    )

    const startTime = Date.now()
    if (this.validationSchema) {
      this.validationSchema.additionalProperties = false
    }

    try {
      const result = await this.run(inputData)
      logger.info(`${uuid}(${this.constructor.name}) - DONE (${(Date.now() - startTime).toString()} ms)`)
      return result
    } catch (error) {
      const errorType: string = (error instanceof ApiError ? error.type : null) ?? 'UnknownError'
      const errorMessage = `${uuid}(${this.constructor.name})`
        + `- ERROR ${errorType} (${(Date.now() - startTime).toString()} ms)`
      logger.error(errorMessage)
      throw error instanceof Error ? error : new Error(`${errorMessage} - ${String(error)}`)
    }
  }

  protected abstract run(inputData: IN): Promise<OUT>
}
