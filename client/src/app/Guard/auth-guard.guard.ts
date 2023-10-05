import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const checkCookie = cookieService.get('userToken');

  return checkCookie ? true : router.navigateByUrl('/auth/signin');
};
