import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../visitor/services/auth.service';
import { inject } from '@angular/core';

export const accessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRole = route.data['roles'];

  if(!authService.isAuthorized(allowedRole)) {
    // if(authService.isAuthorized(["ROLE_ADMIN"])) {
    //   router.navigate(['/auth']);
    // }else {
    //   router.navigate(['/user']);
    // }
    router.navigate(['/unauthorized']);
    return false;
  }
  return authService.isAuthorized(allowedRole);
};
