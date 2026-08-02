import { InjectionToken } from '@angular/core';
import { environment } from 'environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  factory: () => environment.apiUrl,
});

export const USE_LOCAL_DATA = new InjectionToken<boolean>('USE_LOCAL_DATA', {
  factory: () => environment.useLocalData,
});

export const GEO_API_URL = new InjectionToken<string>('GEO_API_URL', {
  factory: () => environment.geoApiUrl,
});

export const GEO_API_KEY = new InjectionToken<string>('GEO_API_KEY', {
  factory: () => environment.geoApiKey,
});
