import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public serverUrl = `${environment.serverUrl}/api`;

  constructor(public httpClient: HttpClient) {}
}
