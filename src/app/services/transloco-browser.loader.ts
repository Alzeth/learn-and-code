import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoBrowserLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  getTranslation(lang: string) {
    const baseHref = this.document.querySelector('base')?.getAttribute('href') ?? '/';
    return this.http.get<Translation>(`${baseHref}assets/i18n/${lang}.json`);
  }
}
