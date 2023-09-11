import { InjectionToken } from '@angular/core';
import { UrlValueInterface } from './appconfig.interface';
import { environment } from '../../environments/environment';

// Service
export const urlService = new InjectionToken<UrlValueInterface>('url');

//  Value
export const urlValue: UrlValueInterface = {
  apiEndpoints: environment.apiEndpoint,
};
