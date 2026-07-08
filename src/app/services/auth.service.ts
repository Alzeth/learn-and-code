import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ROUTES } from '@app/constants';
import { API_BASE_URL } from './api.config';
import { IApiResponse, IAuthResponse, IAuthUser } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = inject(API_BASE_URL);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _user = signal<IAuthUser | null>(this.loadStoredUser());
  readonly currentUser = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  login(email: string, password: string) {
    return this.http
      .post<IApiResponse<IAuthResponse>>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(map(res => res.data!), tap(data => this.persist(data)));
  }

  register(email: string, password: string) {
    return this.http
      .post<IApiResponse<IAuthResponse>>(`${this.apiUrl}/auth/register`, { email, password })
      .pipe(map(res => res.data!), tap(data => this.persist(data)));
  }

  me() {
    return this.http
      .get<IApiResponse<IAuthUser>>(`${this.apiUrl}/auth/me`)
      .pipe(map(res => res.data!), tap(user => this._user.set(user)));
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
    this._user.set(null);
    this.router.navigate([ROUTES.AUTH.LOGIN]);
  }

  async init(): Promise<void> {
    if (!this.isBrowser) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
      await firstValueFrom(this.me());
    } catch {
      this.logout();
    }
  }

  private persist(data: IAuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    this._user.set(data.user);
  }

  private loadStoredUser(): IAuthUser | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}