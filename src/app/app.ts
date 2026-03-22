import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/header/header';
import { LoggerService } from '@services/logger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private logger: LoggerService = inject(LoggerService);
  protected readonly title = signal('learn-and-code');

  ngOnInit() {
    this.logger.info('AppComponent is running');
  }
}
