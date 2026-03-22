import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  providers: [ActivatedRoute],
  standalone: true,
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {

}
