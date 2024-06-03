import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SharedService } from './shared/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router= inject(Router);
  const sharedServ=inject(SharedService);
  if(!auth.isLoggedIn()){
    let fromRoute = localStorage.getItem('loginroute');
    console.log("From Router in Sevr", fromRoute)
    router.navigate([fromRoute])
    return false
  }
  return true
};
