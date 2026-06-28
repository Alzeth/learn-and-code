import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROUTES } from '@app/constants';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree([ROUTES.AUTH.LOGIN]);
};