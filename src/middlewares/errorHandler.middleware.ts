import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { Logger, LoggerInterface } from '../decorators/Logger';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  constructor(
    @Logger() private log: LoggerInterface
  ) { }

  public error(error: HttpError, request: express.Request): void {

    const name = error.name;
    const message = error.message;
    const stack = error.stack !== undefined ? error.stack.split('\n') : [];

    this.log.error(name, request.originalUrl, message, stack);
  }
}
