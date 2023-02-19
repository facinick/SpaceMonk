import { BaseError } from './BaseError'

/*
4xx Client Error: The request contains bad syntax or cannot be fulfilled.

400 Bad Request: The request could not be understood or was missing required parameters.
401 Unauthorized: Authentication is required and has failed or has not been provided.
403 Forbidden: The client does not have access rights to the content.
404 Not Found: The requested resource could not be found.
405 Method Not Allowed: The method specified in the request is not allowed for the resource identified.
406 Not Acceptable: The resource identified by the request is only capable of generating response entities that have content characteristics not acceptable according to the accept headers sent in the request.
408 Request Timeout: The client did not produce a request within the time that the server was prepared to wait.
409 Conflict: The request could not be completed due to a conflict with the current state of the target resource.
*/

export const ClientError = BaseError.subclass('ClientError')

export const BadRequestError = ClientError.subclass('BadRequestError', {
  props: {
    code: 400,
  },
})

export const UnauthorizedError = ClientError.subclass('UnauthorizedError', {
  props: {
    code: 401,
  },
})

export const ForbiddenError = ClientError.subclass('ForbiddenError', {
  props: {
    code: 403,
  },
})

export const NotFoundError = ClientError.subclass('NotFoundError', {
  props: {
    code: 404,
  },
})

export const ConflictError = ClientError.subclass('ConflictError', {
  props: {
    code: 409,
  },
})
