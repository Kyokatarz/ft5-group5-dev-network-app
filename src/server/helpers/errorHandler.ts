import { BadRequestError, CredentialError, InternalServerError } from './errors'

const Identification_Duplicated = 'IdentificationDuplicated'
const Credential_Error = 'CredentialError'

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
