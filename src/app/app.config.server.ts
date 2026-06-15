import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_BASE_URL, USE_LOCAL_DATA } from './services/api.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: API_BASE_URL, useFactory: () => process.env['NG_APP_API_URL'] ?? '' },
    { provide: USE_LOCAL_DATA, useFactory: () => process.env['NG_APP_USE_LOCAL_DATA'] === 'true' },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
