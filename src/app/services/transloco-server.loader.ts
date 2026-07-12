import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    const filePath = join(
      process.cwd(),
      'dist',
      'learn-and-code',
      'browser',
      'assets',
      'i18n',
      `${lang}.json`
    );
    return of(JSON.parse(readFileSync(filePath, 'utf-8')));
  }
}
