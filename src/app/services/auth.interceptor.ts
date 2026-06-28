import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ROUTES } from '@app/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  const token = isBrowser ? localStorage.getItem('access_token') : null;

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        if (isBrowser) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
        router.navigate([ROUTES.AUTH.LOGIN]);
      }
      return throwError(() => err);
    })
  );
};