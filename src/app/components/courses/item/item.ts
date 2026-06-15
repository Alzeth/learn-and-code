import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardCardComponent } from "@app/shared/components/card";
import { ICourse } from '@app/interfaces';

@Component({
  selector: 'app-course-item',
  imports: [
    ZardCardComponent,
    RouterLink,
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  course = input<ICourse>();
}
