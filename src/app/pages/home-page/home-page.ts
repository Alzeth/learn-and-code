import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true,
})
export class HomePage {

}
