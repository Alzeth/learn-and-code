import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideContrast } from '@ng-icons/lucide';

import { LoggerService } from '@app/services/logger';
import { Burger } from '@app/shared/components/burger/burger';

import { ZardButtonComponent } from '@app/shared/components/button';
import { Logo } from '@app/shared/components/logo/logo';
import { ZardDarkMode } from '@app/shared/services/dark-mode';

@Component({
  selector: 'app-header',
  imports: [
    ZardButtonComponent,
    Logo,
    RouterLink,
    Burger,
    NgIcon
  ],
  viewProviders: [provideIcons({ lucideContrast })],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private logger: LoggerService = inject(LoggerService);
  private readonly darkModeService = inject(ZardDarkMode);
  isOpen = signal(false);

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
    this.logger.debug('Current theme', this.darkModeService.currentTheme());
  }
}
