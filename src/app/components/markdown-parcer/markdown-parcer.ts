import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-markdown-parcer',
  standalone: true,
  imports: [
    MarkdownComponent,
  ],
  templateUrl: './markdown-parcer.html',
  styleUrl: './markdown-parcer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownParcer {
  readonly theory = input<string | undefined>('');
}
