import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>(
  'API_BASE_URL',
  { factory: () => import.meta.env['NG_APP_API_URL'] ?? '' }
);

export const USE_LOCAL_DATA = new InjectionToken<boolean>(
  'USE_LOCAL_DATA',
  { factory: () => import.meta.env['NG_APP_USE_LOCAL_DATA'] === 'true' }
);
