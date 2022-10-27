export enum Languages {
  EN = 'en',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum DateFormat {
  YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
  HH_mm_ss_DIV = 'HH:mm:ss',
  YYYY_MM_DD_HYPHEN_HH_mm_ss_DIV = 'YYYY-MM-DD HH:mm:ss',
}

export const SECONDS_IN_DAY = 86400;

export const DEFAULT_MIN_DATE = '1970-01-01 00:00:00';
export const DEFAULT_MAX_DATE = '3000-01-01 00:00:00';

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INVALID_USERNAME_OR_PASSWORD = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  GROUP_HAS_CHILDREN = 410,
  GROUP_MAX_LEVEL = 411,
  GROUP_MAX_QUANTITY = 412,
  USER_CAN_NOT_ACCESS_RESOURCE = 413,
  AWS_ERROR = 414,
  IAM_ERROR = 420,
  ITEM_NOT_FOUND = 444,
  ITEM_ALREADY_EXIST = 445,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const MicroserviceConnection = {
  serviceName: 'PAYMENT_SERVICE',
  eventName: {
    PAYMENT_PROCESSED: 'payment_processed',
    ORDER_CREATED: 'order_created',
    CANCEL_ORDER: 'cancel_order',
  },
};
