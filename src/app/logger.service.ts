import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // only use in dev environment not use in production
  constructor() {}
  log(msg: string) {
    console.log(msg);
    // if we remove the providerIn : 'root' in the @Injectable then it will not show any error because it is used as optional in the app.component.ts @Optional()
  }
}
