type httpStatusType =
  | 'NOT_AUTHORIZED'
  | 'CREATED'
  | 'OK'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER'
  | 'CONFLICT'
  | 'BAD_REQUEST'
  | 'NOT_ACCEPTABLE'
  | 'FORBIDDEN'

type statusType = Record<httpStatusType, number>;

export const HTTP_STATUS: statusType = {
  NOT_AUTHORIZED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_ACCEPTABLE: 406,
  FORBIDDEN: 403
};
