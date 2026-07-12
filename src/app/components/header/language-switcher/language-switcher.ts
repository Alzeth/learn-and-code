import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

import { LANGUAGES } from '@/shared/constants';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
  host: { '(document:click)': 'onDocumentClick()' },
  imports: [NgOptimizedImage],
})
export class LanguageSwitcher {
  private readonly translocoService = inject(TranslocoService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly langs = LANGUAGES;
  readonly isOpen = signal(false);
  readonly activeLang = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });
  readonly activeLangFlag = computed(
    () => LANGUAGES.find((language) => language.code === this.activeLang())?.flag ?? 'gb',
  );
  readonly activeLangLabel = computed(
    () => LANGUAGES.find((language) => language.code === this.activeLang())?.label ?? 'English',
  );

  toggle(event: Event): void {
    event.stopPropagation();
    this.isOpen.update((value) => !value);
  }

  selectLang(code: string, event: Event): void {
    event.stopPropagation();
    this.translocoService.setActiveLang(code);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', code);
    }
    this.isOpen.set(false);
  }

  onDocumentClick(): void {
    this.isOpen.set(false);
  }
}
