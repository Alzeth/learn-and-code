import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardCardComponent } from "@shared/components/card";
import { ILesson } from 'app/interfaces';

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
  @Input({ required: true }) lesson: ILesson = {
    id: 0,
    title: '',
    href: '',
    description: '',
    date: '',
    datetime: '',
    icon: ''
  };
}
