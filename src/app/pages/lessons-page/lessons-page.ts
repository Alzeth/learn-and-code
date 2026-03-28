import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lessons-page',
  imports: [
    RouterLink
  ],
  templateUrl: './lessons-page.html',
  styleUrl: './lessons-page.css',
})
export class LessonsPage {
  lessons = [
    {
      id: 1,
      title: 'Урок 1',
      href: '0111-1111-1111',
      description: 'Навчитись писати прості програми. Перевірити налаштування середовища програмування',
      date: 'Apr 23, 2025',
      datetime: '2025-04-23',
      icon: null,
    }
  ];
}
