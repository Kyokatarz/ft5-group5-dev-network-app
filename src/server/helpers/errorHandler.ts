import { BadRequestError, CredentialError, InternalServerError } from './errors'

export const Identification_Duplicated = 'IdentificationDuplicated'
export const Credential_Error = 'CredentialError'

export const errorHandler = (err: string) => {
  switch (err) {
    case Identification_Duplicated:
      throw new BadRequestError('This email has already existed')
    case Credential_Error:
      throw new CredentialError()
    default:
      throw new InternalServerError()
  }
}
