import { HTTP_STATUS, HTTP_MESSAGES } from '@constants';
import { NextResponse } from 'next/server';

export class HttpBadRequest extends NextResponse {
  constructor(message: string = HTTP_MESSAGES.BAD_REQUEST) {
    super(message, { status: HTTP_STATUS.BAD_REQUEST });
  }
}

export class HttpInternalServerError extends NextResponse {
  constructor(message: string = HTTP_MESSAGES.INTERNAL_SERVER_ERROR) {
    super(message, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
  }
}

export class HttpNotFound extends NextResponse {
  constructor(message: string = HTTP_MESSAGES.NOT_FOUND) {
    super(message, { status: HTTP_STATUS.NOT_FOUND });
  }
}
