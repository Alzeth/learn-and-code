import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {}
