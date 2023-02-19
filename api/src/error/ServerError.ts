import { BaseError } from './BaseError'

/*
5xx Server Error: The server failed to fulfill a valid request.

500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
501 Not Implemented: The server does not support the functionality required to fulfill the request.
503 Service Unavailable: The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access to complete the request.
*/

export const ServerError = BaseError.subclass('ServerError')

export const InternalServerError = ServerError.subclass('InternalServerError', {
  props: {
    code: 500,
  },
})

export const DatabaseError = InternalServerError.subclass('InternalServerError')
