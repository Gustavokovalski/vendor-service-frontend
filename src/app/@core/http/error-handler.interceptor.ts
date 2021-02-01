import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/services/snackbar.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    public snackbarService: SnackBarService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      log.error('Request error', response);
    }

    if (response instanceof HttpErrorResponse) {
      if (response.error instanceof ErrorEvent) {
        console.error('Error Event');
      } else {
        console.log(`error status : ${response.status} ${response.statusText}`);
        switch (response.status) {
          case 401: //login
            this.authenticationService.logout();
            this.router.navigateByUrl('/login');
            break;
          case 403: //forbidden
            this.snackbarService.openSnackBar('Sem autorização', 'error');
            break;
        }
      }
    } else {
      this.snackbarService.openSnackBar('Ocorreu um erro.', 'error');
      console.error('some thing else happened');
    }

    throw response;
  }
}
