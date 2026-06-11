import { InjectionToken } from '@angular/core';

import { environment } from 'environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  factory: () => environment.apiUrl,
});

export const USE_LOCAL_DATA = new InjectionToken<boolean>('USE_LOCAL_DATA', {
  factory: () => environment.useLocalData,
});
