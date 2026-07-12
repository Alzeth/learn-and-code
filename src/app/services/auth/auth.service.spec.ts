import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ROUTES } from 'app/constants';

import { API_BASE_URL } from '../api.config';
import { IApiResponse, IAuthResponse, IAuthUser } from '../interfaces';
import { AuthService } from './auth.service';

const mockUser: IAuthUser = { id: 'u1', email: 'test@example.com' };
const mockAuthResponse: IAuthResponse = { accessToken: 'tok', user: mockUser };
const wrapResponse = <T>(data: T): IApiResponse<T> => ({
  success: true,
  data,
  error: null,
  meta: { requestId: 'r1', timestamp: '' },
});

describe('AuthService (browser)', () => {
  let service: AuthService;
  let httpMock: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let storageSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    httpMock = { get: vi.fn(), post: vi.fn() };
    routerMock = { navigate: vi.fn() };

    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpMock },
        { provide: Router, useValue: routerMock },
        { provide: API_BASE_URL, useValue: 'https://api.test' },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(AuthService);
    storageSpy = vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    localStorage.clear();
    storageSpy.mockRestore();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start unauthenticated when localStorage is empty', () => {
    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should load stored user from localStorage on init', () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpMock },
        { provide: Router, useValue: routerMock },
        { provide: API_BASE_URL, useValue: 'https://api.test' },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    const freshService = TestBed.inject(AuthService);

    expect(freshService.currentUser()).toEqual(mockUser);
    expect(freshService.isAuthenticated()).toBe(true);
  });

  it('login() should persist token and set user', () => {
    httpMock.post.mockReturnValue(of(wrapResponse(mockAuthResponse)));
    let result: IAuthResponse | undefined;

    service.login('test@example.com', 'pass').subscribe((v) => (result = v));

    expect(result).toEqual(mockAuthResponse);
    expect(service.currentUser()).toEqual(mockUser);
    expect(storageSpy).toHaveBeenCalledWith('access_token', 'tok');
    expect(storageSpy).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  it('register() should persist token and set user', () => {
    httpMock.post.mockReturnValue(of(wrapResponse(mockAuthResponse)));
    service.register('test@example.com', 'pass').subscribe();

    expect(service.currentUser()).toEqual(mockUser);
  });

  it('logout() should clear storage and navigate to login', () => {
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');
    service.logout();

    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
    expect(removeSpy).toHaveBeenCalledWith('access_token');
    expect(removeSpy).toHaveBeenCalledWith('user');
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES.AUTH.LOGIN]);
    removeSpy.mockRestore();
  });

  it('me() should update currentUser from the API', () => {
    httpMock.get.mockReturnValue(of(wrapResponse(mockUser)));
    service.me().subscribe();

    expect(service.currentUser()).toEqual(mockUser);
  });

  it('init() should call logout when me() fails', async () => {
    localStorage.setItem('access_token', 'stale-token');
    httpMock.get.mockReturnValue(throwError(() => new Error('Unauthorized')));
    const logoutSpy = vi.spyOn(service, 'logout');

    await service.init();

    expect(logoutSpy).toHaveBeenCalled();
  });

  it('init() should do nothing when no token is stored', async () => {
    const logoutSpy = vi.spyOn(service, 'logout');
    await service.init();
    expect(logoutSpy).not.toHaveBeenCalled();
  });
});

describe('AuthService (server)', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: { get: vi.fn(), post: vi.fn() } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: API_BASE_URL, useValue: '' },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should start with null user on server', () => {
    expect(service.currentUser()).toBeNull();
  });

  it('init() should return early on server without calling me()', async () => {
    const httpMock = TestBed.inject(HttpClient) as unknown as { get: ReturnType<typeof vi.fn> };
    await service.init();
    expect(httpMock.get).not.toHaveBeenCalled();
  });
});
