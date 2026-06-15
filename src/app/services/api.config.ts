import { InjectionToken } from '@angular/core';

// Module-level constants ensure esbuild replaces import.meta.env.* at build time.
// Accessing them inside a nested factory body is less reliably replaced.
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
