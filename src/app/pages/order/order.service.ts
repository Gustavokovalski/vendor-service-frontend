import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '@app/models/base.model';
import { IOrderModel } from '@app/models/order.model';
import { IProductOrderModel } from '@app/models/product-order.model';
import { IProductModel } from '@app/models/product.model';
import { IUserModel } from '@app/models/user.model';
import { BaseService } from 'src/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class IOrderService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async create(data: IOrderModel): Promise<IBaseModel<IOrderModel>> {
    return this.httpClient.post<IBaseModel<IOrderModel>>(`${this.serverUrl}/salesorder`, data).toPromise();
  }

  public list(): Promise<IBaseModel<IOrderModel[]>> {
    return this.httpClient.get<IBaseModel<IOrderModel[]>>(`${this.serverUrl}/salesorder`, {}).toPromise();
  }

  public getById(id: number): Promise<IBaseModel<IOrderModel>> {
    return this.httpClient.get<IBaseModel<IOrderModel>>(`${this.serverUrl}/salesorder/${id}`, {}).toPromise();
  }

  public async update(data: IOrderModel): Promise<IBaseModel<IOrderModel>> {
    return this.httpClient.put<IBaseModel<IOrderModel>>(`${this.serverUrl}/salesorder/`, data).toPromise();
  }

  public async delete(id: number): Promise<IBaseModel<IOrderModel>> {
    return this.httpClient.delete<IBaseModel<IOrderModel>>(`${this.serverUrl}/salesorder?id=${id}`).toPromise();
  }

  public getByOrderId(id: number): Promise<IBaseModel<IProductOrderModel[]>> {
    return this.httpClient
      .get<IBaseModel<IProductOrderModel[]>>(`${this.serverUrl}/salesorder/productorder/${id}`, {})
      .toPromise();
  }
}
