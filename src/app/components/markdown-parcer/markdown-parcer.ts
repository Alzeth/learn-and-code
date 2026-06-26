import { Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-markdown-parcer',
  imports: [
    MarkdownComponent,
  ],
  templateUrl: './markdown-parcer.html',
  styleUrl: './markdown-parcer.css',
})
export class MarkdownParcer {
  readonly theory = input<string | undefined>('');
}
