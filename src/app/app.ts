import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Header } from '@app/components/header/header';
import { LoggerService } from '@app/services/logger';
import { AppLoader } from 'app/shared/components/app-loader/app-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, AppLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private logger: LoggerService = inject(LoggerService);
  private readonly destroyRef = inject(DestroyRef);
  readonly isLoading = signal(false);
  protected readonly title = signal('learn-and-code');

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isLoading.set(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoading.set(false);
        }
      });
  }

  ngOnInit() {
    this.logger.info('AppComponent is running');
  }
}
