import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any',
})
export class ConfigService {
  constructor(@Inject(RouteConfigToken) private ConfigToken: RouteConfig) {
    console.log('ConfigService initialized');
    console.log(ConfigToken); // create seperate instance app module & room module if we use providerIn : 'any'
  }
}
