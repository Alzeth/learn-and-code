import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ICourse } from 'app/interfaces';
import { ZardCardComponent } from 'app/shared/components/card';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [
    ZardCardComponent,
    RouterLink,
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Item {
  readonly course = input<ICourse>();
}
