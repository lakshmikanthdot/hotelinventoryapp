import { ErrorHandler } from '@angular/core';

// error handel by global level
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.log(error);
  }
}
