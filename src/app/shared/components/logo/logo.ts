import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  standalone: true,
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {

}
