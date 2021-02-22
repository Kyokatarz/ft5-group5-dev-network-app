import {
  BadRequestError,
  CredentialError,
  InternalServerError,
  NotAuthorisedError,
  NotFoundError,
  YupValidationError,
} from './errors'

export const IDENTIFICATION_DUPLICATED = 'IDENTIFICATION_DUPLICATED'
export const CREDENTIAL_ERROR = 'CREDENTIAL_ERROR'
export const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR'
export const VALIDATION_ERROR = 'ValidationError'
export const NO_TOKEN = 'NO_TOKEN'
export const NOT_AUTHORISED_ERROR = 'NOT_AUTHORISED_ERROR'

export const errorHandler = (err: any): void => {
  if (err.name === VALIDATION_ERROR)
    throw new YupValidationError(err.errors.join(', '))

  if (err.kind === 'ObjectId') throw new NotFoundError()

  switch (err) {
    case IDENTIFICATION_DUPLICATED:
      throw new BadRequestError('This email has already existed')
    case CREDENTIAL_ERROR:
      throw new CredentialError()
    case NOT_FOUND_ERROR:
      throw new NotFoundError()
    case NO_TOKEN:
      throw new NotAuthorisedError()
    case NOT_AUTHORISED_ERROR:
      throw new NotAuthorisedError()
    default:
      console.log(err)
      throw new InternalServerError()
  }
}
