import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../../services/base.service';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  emailFormControl: string;
  passwordFormControl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(private credentialsService: CredentialsService, public httpClient: HttpClient) {
    super(httpClient);
  }

  login(context: LoginContext): Observable<Credentials> {
    const data = {
      email: context.emailFormControl,
      password: context.passwordFormControl,
    };

    let email = data.email;
    let password = data.password;

    var auth = this.httpClient
      .post<any>(`${this.serverUrl}/user/login`, { email, password })
      .pipe(
        map((user) => {
          if (user.success) {
            this.credentialsService.setCredentials(user);
          }
          return user;
        })
      );
    return auth;
  }

  logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    return of(true);
  }
}
