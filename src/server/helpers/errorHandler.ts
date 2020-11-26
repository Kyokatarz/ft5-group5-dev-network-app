import {
  BadRequestError,
  CredentialError,
  InternalServerError,
  NotFoundError,
} from './errors'

export const IDENTIFICATION_DUPLICATED = 'IDENTIFICATION_DUPLICATED'
export const CREDENTIAL_ERROR = 'CREDENTIAL_ERROR'
export const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR'

export const errorHandler = (err: string) => {
  switch (err) {
    case IDENTIFICATION_DUPLICATED:
      throw new BadRequestError('This email has already existed')
    case CREDENTIAL_ERROR:
      throw new CredentialError()
    case NOT_FOUND_ERROR:
      throw new NotFoundError()

    default:
      throw new InternalServerError()
  }
}
