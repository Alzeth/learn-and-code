import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_BASE_URL, USE_LOCAL_DATA } from './services/api.config';
import { TranslocoServerLoader } from './services/transloco-server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: API_BASE_URL, useFactory: () => process.env['NG_APP_API_URL'] ?? '' },
    { provide: USE_LOCAL_DATA, useFactory: () => process.env['NG_APP_USE_LOCAL_DATA'] === 'true' },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoServerLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
