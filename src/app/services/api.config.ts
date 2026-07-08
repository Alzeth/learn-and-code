import { InjectionToken } from '@angular/core';

const _apiUrl = import.meta.env.NG_APP_API_URL || '';
const _useLocalData = import.meta.env.NG_APP_USE_LOCAL_DATA === 'true';

export const API_BASE_URL = new InjectionToken<string>(
  'API_BASE_URL',
  { factory: () => _apiUrl }
);

export const USE_LOCAL_DATA = new InjectionToken<boolean>(
  'USE_LOCAL_DATA',
  { factory: () => _useLocalData }
);
