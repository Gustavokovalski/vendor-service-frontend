import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '@app/models/base.model';
import { IUserModel } from '@app/models/user.model';
import { BaseService } from 'src/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class IUserService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async create(data: IUserModel): Promise<IBaseModel<IUserModel>> {
    return this.httpClient.post<IBaseModel<IUserModel>>(`${this.serverUrl}/user`, data).toPromise();
  }

  public list(): Promise<IBaseModel<IUserModel[]>> {
    return this.httpClient.get<IBaseModel<IUserModel[]>>(`${this.serverUrl}/user`, {}).toPromise();
  }

  public getById(id: string): Promise<IBaseModel<IUserModel>> {
    return this.httpClient.get<IBaseModel<IUserModel>>(`${this.serverUrl}/user/${id}`, {}).toPromise();
  }

  public async update(data: IUserModel): Promise<IBaseModel<IUserModel>> {
    return this.httpClient.put<IBaseModel<IUserModel>>(`${this.serverUrl}/user/`, data).toPromise();
  }

  public async delete(id: string): Promise<IBaseModel<IUserModel>> {
    return this.httpClient.delete<IBaseModel<IUserModel>>(`${this.serverUrl}/user?id=${id}`).toPromise();
  }
}
