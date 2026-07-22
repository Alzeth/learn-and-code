import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideMarkdown } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { AuthService } from 'app/services/auth';
import { authInterceptor } from 'app/services/auth.interceptor';
import { localeInterceptor } from 'app/services/locale.interceptor';
import { TranslocoBrowserLoader } from 'app/services/transloco-browser.loader';
import { provideZard } from 'app/shared/core/provider/providezard';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([localeInterceptor, authInterceptor])),
    provideZard(),
    importProvidersFrom(MonacoEditorModule.forRoot()),
    provideMarkdown(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'uk', 'de', 'es', 'pl', 'fr', 'it'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoBrowserLoader,
    }),
    provideAppInitializer(() => inject(AuthService).init()),
    provideAppInitializer(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const savedLang = localStorage.getItem('lang') ?? 'en';
        inject(TranslocoService).setActiveLang(savedLang);
      }
    }),
  ],
};
