import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  private readonly router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }
}
