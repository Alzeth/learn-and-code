import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from 'environments/environment.development';

import { App } from 'app/app';
import { appConfig } from 'app/app.config';

if (environment.production) {
  enableProdMode();
  const methods = ['log', 'debug', 'info', 'warn', 'error'];
  methods.forEach((method) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.console as any)[method] = () => {};
  });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // eslint-disable-line no-console
