import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService, CredentialsService } from '@app/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private credentialService: CredentialsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.credentialService.credentials;
    if (currentUser && currentUser.result.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.result.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
