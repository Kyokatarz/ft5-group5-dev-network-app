export default class ApiError extends Error {
  constructor(readonly message: string, readonly source?: Error) {
    super()
  }
}

export class DocumentNotFoundError extends ApiError {
  constructor(readonly message: string = 'Document not found', source?: Error) {
    super(message, source)
    Object.setPrototypeOf(this, DocumentNotFoundError.prototype)
  }
}
