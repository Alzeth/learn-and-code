import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    const distPath = join(
      process.cwd(),
      'dist',
      'learn-and-code',
      'browser',
      'assets',
      'i18n',
      `${lang}.json`,
    );
    const publicPath = join(process.cwd(), 'public', 'assets', 'i18n', `${lang}.json`);
    const filePath = existsSync(distPath) ? distPath : publicPath;
    return of(JSON.parse(readFileSync(filePath, 'utf-8')));
  }
}
