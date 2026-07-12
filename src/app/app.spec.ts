import { TestBed } from '@angular/core/testing';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject } from 'rxjs';

import { LoggerService } from 'app/services/logger';

import { App } from './app';

describe('App', () => {
  let routerEvents$: Subject<NavigationStart | NavigationEnd | NavigationCancel | NavigationError>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Router, useValue: { events: routerEvents$.asObservable() } },
        { provide: LoggerService, useValue: { info: () => {}, debug: () => {} } },
      ],
    })
      .overrideComponent(App, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize isLoading to false', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('should set isLoading to true on NavigationStart', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    routerEvents$.next(new NavigationStart(1, '/'));
    expect(fixture.componentInstance.isLoading()).toBe(true);
  });

  it('should set isLoading to false on NavigationEnd', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    routerEvents$.next(new NavigationStart(1, '/'));
    routerEvents$.next(new NavigationEnd(1, '/', '/'));
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('should set isLoading to false on NavigationCancel', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    routerEvents$.next(new NavigationStart(1, '/'));
    routerEvents$.next(new NavigationCancel(1, '/', ''));
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('should set isLoading to false on NavigationError', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    routerEvents$.next(new NavigationStart(1, '/'));
    routerEvents$.next(new NavigationError(1, '/', new Error('test')));
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });
});
