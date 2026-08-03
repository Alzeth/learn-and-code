import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth';
import { ToastService } from 'app/services/toast';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);
  const transloco = inject(TranslocoService);

  if (auth.isAuthenticated()) return true;

  const messageKey = route.data['authMessage'] as string | undefined;
  toast.show({
    title: transloco.translate('guards.auth.title'),
    message: transloco.translate(messageKey ?? 'guards.auth.default'),
    icon: 'lucideLock',
  });

  return router.createUrlTree([ROUTES.AUTH.LOGIN]);
};
