import { Response } from 'express'
import log from '../utils/logger'
import { ERROR_CODES } from './constants'

export const defaultOkResponse = (res: Response, message: string | object) => {
  res.status(200).send(message)
  res.end()
}

export const defaultErrorResponse = (res: Response, error: string | any, message?: string) => {
  log.error(`${message ? `Message: ${message} | ` : ''}Error: ${error}`)
  res.status(400).send({ message, error })
  res.end()
}

export const respondError = (
  res: Response,
  errorMessage: string,
  error: string | null,
  code: number = ERROR_CODES.INTERNAL_ERROR,
) => {
  if (error) {
    log.error(`${errorMessage} - ${error}`)
  }
  res.status(code).send(errorMessage)
  res.end()
}

export const responseHandler = (res: Response, err: any, doc: any, errMsg: string, nullDocMsg?: string) => {
  if (err) return defaultErrorResponse(res, err, errMsg)
  if (!doc && nullDocMsg) return defaultErrorResponse(res, nullDocMsg)
  return defaultOkResponse(res, doc)
}
