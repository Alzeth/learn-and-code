import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { IUser } from 'app/interfaces';
import { AuthService } from 'app/services/auth/auth.service';
import { LoggerService } from 'app/services/logger/logger';
import { EDarkModes, ZardDarkMode } from 'app/shared/services';

import { Header } from './header';

describe('Header', () => {
  const currentUserSignal = signal<IUser | null>(null);
  const isAuthenticatedSignal = signal(false);

  const mockAuth = {
    currentUser: currentUserSignal.asReadonly(),
    isAuthenticated: isAuthenticatedSignal.asReadonly(),
    logout: vi.fn(),
  };

  const mockDarkMode = {
    toggleTheme: vi.fn(),
    currentTheme: signal(EDarkModes.LIGHT),
    themeMode: signal<EDarkModes.LIGHT | EDarkModes.DARK>(EDarkModes.LIGHT),
  };

  const mockLogger = { info: vi.fn(), debug: vi.fn(), warn: vi.fn(), error: vi.fn() };

  beforeEach(async () => {
    currentUserSignal.set(null);
    isAuthenticatedSignal.set(false);
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
        { provide: ZardDarkMode, useValue: mockDarkMode },
        { provide: LoggerService, useValue: mockLogger },
      ],
    })
      .overrideComponent(Header, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize isOpen to false', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('should reflect currentUser from AuthService', () => {
    const user: IUser = { id: '1', email: 'test@example.com' };
    currentUserSignal.set(user);

    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.currentUser()).toEqual(user);
  });

  it('should reflect isAuthenticated from AuthService', () => {
    isAuthenticatedSignal.set(true);

    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.isAuthenticated()).toBe(true);
  });

  it('should call darkModeService.toggleTheme on toggleTheme()', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.componentInstance.toggleTheme();
    expect(mockDarkMode.toggleTheme).toHaveBeenCalled();
  });

  it('should call auth.logout on logout()', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.componentInstance.logout();
    expect(mockAuth.logout).toHaveBeenCalled();
  });
});
