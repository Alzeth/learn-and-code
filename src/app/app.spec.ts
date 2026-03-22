import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '@services/logger';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('App Component', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  // Define a mock LoggerService
  const mockLoggerService = {
    info: vi.fn(), // Equivalent to Jasmine's spy
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet], // Include RouterOutlet as it's part of the template
      providers: [
        { provide: LoggerService, useValue: mockLoggerService }, // Mock service
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements/directives like <app-header>
    }).compileComponents();

    fixture = TestBed.createComponent(App); // Create the fixture for the App component
    component = fixture.componentInstance; // Grab the App component instance
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoggerService.info with the correct message on initialization', () => {
    component.ngOnInit(); // Trigger the initialization logic
    expect(mockLoggerService.info).toHaveBeenCalledWith('AppComponent is running');
  });

  it('should render the expected template elements', () => {
    fixture.detectChanges(); // Trigger change detection to render the template

    const compiled = fixture.nativeElement as HTMLElement;

    // Ensure <app-header> is rendered
    expect(compiled.querySelector('app-header')).toBeTruthy();

    // Ensure <main class="main"> is rendered with the correct text content
    const mainElement = compiled.querySelector('main.main');
    expect(mainElement).toBeTruthy();
    expect(mainElement?.textContent).toContain('Main application');
  });

  it('should render the router outlet', () => {
    fixture.detectChanges(); // Trigger change detection

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
