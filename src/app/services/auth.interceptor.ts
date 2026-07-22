import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ROUTES } from 'app/constants';
import { ToastService } from 'app/services/toast';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  const token = isBrowser ? localStorage.getItem('access_token') : null;

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401 && isBrowser) {
        const hadToken = !!localStorage.getItem('access_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        if (!router.url.startsWith(`/${ROUTES.AUTH.LOGIN}`)) {
          toast.show({
            title: hadToken ? 'Session expired' : 'Login required',
            message: hadToken
              ? 'Your session has expired. Please log in again.'
              : 'Please log in to continue.',
            icon: 'lucideLock',
          });
          router.navigate([ROUTES.AUTH.LOGIN]);
        }
      }
      return throwError(() => err);
    }),
  );
};
