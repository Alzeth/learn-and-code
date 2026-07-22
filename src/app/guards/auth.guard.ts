import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth';
import { ToastService } from 'app/services/toast';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (auth.isAuthenticated()) return true;

  const message = route.data['authMessage'] as string | undefined;
  toast.show({
    title: 'Login required',
    message: message ?? 'Please log in to continue.',
    icon: 'lucideLock',
  });

  return router.createUrlTree([ROUTES.AUTH.LOGIN]);
};
