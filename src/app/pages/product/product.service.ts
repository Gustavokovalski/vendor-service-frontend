import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '@app/models/base.model';
import { IProductModel } from '@app/models/product.model';
import { IUserModel } from '@app/models/user.model';
import { BaseService } from 'src/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class IProductService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async create(data: IProductModel): Promise<IBaseModel<IProductModel>> {
    return this.httpClient.post<IBaseModel<IProductModel>>(`${this.serverUrl}/product`, data).toPromise();
  }

  public list(): Promise<IBaseModel<IProductModel[]>> {
    return this.httpClient.get<IBaseModel<IProductModel[]>>(`${this.serverUrl}/product`, {}).toPromise();
  }

  public getById(id: number): Promise<IBaseModel<IProductModel>> {
    return this.httpClient.get<IBaseModel<IProductModel>>(`${this.serverUrl}/product/${id}`, {}).toPromise();
  }

  public async update(data: IProductModel): Promise<IBaseModel<IProductModel>> {
    return this.httpClient.put<IBaseModel<IProductModel>>(`${this.serverUrl}/product/`, data).toPromise();
  }

  public async inactivate(data: IProductModel): Promise<IBaseModel<IProductModel>> {
    return this.httpClient.put<IBaseModel<IProductModel>>(`${this.serverUrl}/product/inactivate/`, data).toPromise();
  }
}
