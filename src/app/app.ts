import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

import { Header } from 'app/components/header/header';
import { ToastContainerComponent } from 'app/components/toast-container/toast-container';
import { LoggerService } from 'app/services/logger/logger';
import { AppLoader } from 'app/shared/components/app-loader/app-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, AppLoader, ToastContainerComponent],
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
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
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
