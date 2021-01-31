import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { SnackBarService } from 'src/services/snackbar.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private snackBarService: SnackBarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.credentialsService.credentials;
    const routeProfile = route.routeConfig.children[0].data.profile;

    if (currentUser) {
      if (routeProfile) {
        if (!routeProfile.includes(currentUser.result.profile.name)) {
          this.snackBarService.openSnackBar('Sem autorização.', 'error');
          this.router.navigate(['/order-list']);
          return false;
        }
      }
      return true;
    }

    if (this.credentialsService.isAuthenticated() || state.url == '/user-registration') {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
