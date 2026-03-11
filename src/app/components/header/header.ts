import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Burger } from '@shared/components/burger/burger';

import { ZardButtonComponent } from '@shared/components/button';
import { ZardIconComponent } from '@shared/components/icon';
import { Logo } from '@shared/components/logo/logo';
import { ZardDarkMode } from '@shared/services/dark-mode';

@Component({
  selector: 'app-header',
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    Logo,
    RouterLink,
    Burger,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly darkModeService = inject(ZardDarkMode);
  isOpen = signal(false);

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }
}
