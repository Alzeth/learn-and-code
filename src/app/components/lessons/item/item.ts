import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardCardComponent } from "@app/shared/components/card";
import { ILesson } from '@app/interfaces';

@Component({
  selector: 'app-lesson-item',
  imports: [
    ZardCardComponent,
    RouterLink,
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  lesson = input<ILesson>();
}
