import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) course: ICourse = {
    id: '',
    title: '',
    description: '',
    tableOfContents: [],
  };
}
