import { ApolloError } from 'apollo-server-micro'
import { SerialiseErrorsType } from '../types'

/** a generic guard class to protect the custom errors structure 
 * every error has a fixed structure errors {message: string, field?: string}[]
 * example of how to use in front-end:
 *  err.response.data.errors.map(e => (
      <li key={e.message}>{e.message}</li>
    ))}
*/

/** errors */
export class BadRequestError extends ApolloError {
  constructor(readonly message: string) {
    super(message, '400')
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: this.message }]
  }
}

export class DatabaseConnectionError extends ApolloError {
  constructor() {
    super('Error connecting to DB', '500')
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Error connecting to DB' }]
  }
}

export class NotAuthorisedError extends ApolloError {
  constructor() {
    super('You are not authorised', '401')
    Object.setPrototypeOf(this, NotAuthorisedError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'You are not authorised' }]
  }
}

export class NotFoundError extends ApolloError {
  constructor() {
    super("Whatever you are looking for, it's not there", '404')
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: "Whatever you are looking for, it's not there" }]
  }
}

export class CredentialError extends ApolloError {
  constructor() {
    super('Invalid credentials', '401')
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Invalid credentials' }]
  }
}

export class InternalServerError extends ApolloError {
  statusCode = 500

  constructor() {
    super('Internal server error')
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Internal server error' }]
  }
}

export class YupValidationError extends ApolloError {
  constructor(readonly message: string) {
    super(message, '400')
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: this.message }]
  }
}
/** then we could use it like this:
 * serialiseErrors() {
    return this.errors.map(e => {
      return {
        message: e.msg,
        field: e.param
      }
    });
  }
 */
