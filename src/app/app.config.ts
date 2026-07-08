import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject,provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { authInterceptor } from 'app/services/auth.interceptor';
import { AuthService } from 'app/services/auth.service';
import { provideZard } from 'app/shared/core/provider/providezard';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideZard(),
    importProvidersFrom(MonacoEditorModule.forRoot()),
    provideMarkdown(),
    provideAppInitializer(() => inject(AuthService).init()),
  ]
};
