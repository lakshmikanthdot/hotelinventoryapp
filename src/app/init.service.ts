import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  config: any;
  constructor(private http: HttpClient) {}

  // this service need to called before my app initilized make the api call get the data do what ever we can do
  // use this service any where so this data can be avaliable

  init() {
    return this.http
      .get('/assets/config.json')
      .pipe(tap((config) => (this.config = config)));
  }
}
