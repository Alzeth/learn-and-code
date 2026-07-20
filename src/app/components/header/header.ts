import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideContrast, lucideUserCircle } from '@ng-icons/lucide';

import { AuthService } from 'app/services/auth/auth.service';
import { LoggerService } from 'app/services/logger/logger';
import { Burger } from 'app/shared/components/burger/burger';
import { ZardButtonComponent } from 'app/shared/components/button';
import { Logo } from 'app/shared/components/logo/logo';
import { ZardDarkMode } from 'app/shared/services/dark-mode';

import { LanguageSwitcher } from './language-switcher/language-switcher';
import { ZardTooltipImports } from '@/shared/components/tooltip';

@Component({
  selector: 'app-header',
  imports: [ZardButtonComponent, Logo, RouterLink, Burger, NgIcon, LanguageSwitcher, TranslocoPipe, ZardTooltipImports],
  viewProviders: [provideIcons({ lucideContrast, lucideUserCircle })],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private logger: LoggerService = inject(LoggerService);
  private readonly darkModeService = inject(ZardDarkMode);
  private readonly auth = inject(AuthService);

  readonly isOpen = signal(false);
  readonly currentUser = this.auth.currentUser;
  readonly isAuthenticated = this.auth.isAuthenticated;

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
    this.logger.debug('Current theme', this.darkModeService.currentTheme());
  }

  logout(): void {
    this.auth.logout();
  }
}
