import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { AVAILABLE_LANGS } from 'app/constants';
import { AuthService } from 'app/services/auth';
import { authInterceptor } from 'app/services/auth.interceptor';
import { GeolocationService } from 'app/services/geolocation/geolocation.service';
import { localeInterceptor } from 'app/services/locale.interceptor';
import { TranslocoBrowserLoader } from 'app/services/transloco-browser.loader';
import { provideZard } from 'app/shared/core/provider/providezard';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([localeInterceptor, authInterceptor])),
    provideZard(),
    provideTransloco({
      config: {
        availableLangs: AVAILABLE_LANGS,
        defaultLang: AVAILABLE_LANGS[0],
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoBrowserLoader,
    }),
    provideAppInitializer(() => inject(AuthService).init()),
    provideAppInitializer(async () => {
      if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

      const translocoService = inject(TranslocoService);
      const savedLang = localStorage.getItem('lang');

      if (savedLang) {
        translocoService.setActiveLang(savedLang);
        return;
      }

      try {
        const data = await firstValueFrom(inject(GeolocationService).getGeolocation());
        const detected = data.country.languages[0]?.iso_code ?? AVAILABLE_LANGS[0];
        const lang = AVAILABLE_LANGS.includes(detected) ? detected : AVAILABLE_LANGS[0];
        translocoService.setActiveLang(lang);
        localStorage.setItem('lang', lang);
      } catch {
        translocoService.setActiveLang(AVAILABLE_LANGS[0]);
      }
    }),
  ],
};
