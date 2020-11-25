import { SerialiseErrorsType } from '../types'

/** a generic guard class to protect the custom errors structure 
 * every error has a fixed structure errors {message: string, field?: string}[]
 * example of how to use in front-end:
 *  err.response.data.errors.map(e => (
      <li key={e.message}>{e.message}</li>
    ))}
*/
export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(readonly message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serialiseErrors(): { message: string; field?: string }[]
}

/** errors */
export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(readonly message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: this.message }]
  }
}

export class DatabaseConnectionError extends CustomError {
  statusCode = 500

  constructor() {
    super('Error connecting to DB')
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Error connecting to DB' }]
  }
}

export class NotAuthorisedError extends CustomError {
  statusCode = 401

  constructor() {
    super('You are not authorised')
    Object.setPrototypeOf(this, NotAuthorisedError.prototype)
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'You are not authorised' }]
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super("Whatever you are looking for, it's not there")
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: "Whatever you are looking for, it's not there" }]
  }
}

export class CredentialError extends CustomError {
  statusCode = 401

  constructor() {
    super('Invalid credentials')
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Invalid credentials' }]
  }
}

export class InternalServerError extends CustomError {
  statusCode = 500

  constructor() {
    super('Internal server error')
  }

  serialiseErrors(): SerialiseErrorsType {
    return [{ message: 'Internal server error' }]
  }
}

//TODO: add request validation error class
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
