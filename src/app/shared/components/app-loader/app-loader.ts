import { Component } from '@angular/core';
import { ZardLoaderComponent } from 'app/shared/components/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.css',
  imports: [
    ZardLoaderComponent,
  ],
})
export class AppLoader {}
