import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardCardComponent } from 'app/shared/components/card';
import { ICourse } from 'app/interfaces';

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
  course = input<ICourse>();
}
