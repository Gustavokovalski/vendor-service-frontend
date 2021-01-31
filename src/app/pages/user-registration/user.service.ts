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
    debugger;
    return this.httpClient.get<IBaseModel<IUserModel[]>>(`${this.serverUrl}/user`, {}).toPromise();
  }

  //     public listarPerfis(): Promise<IBaseModel<IEnumModel[]>> {
  //       return this.httpClient
  //       .get<IBaseModel<IEnumModel[]>>(`${this.apiBaseUrl}/usuario/perfis`, { })
  //       .toPromise();
  //   }

  //     public obterPorId(id: string): Promise<IBaseModel<IUsuarioModel>> {
  //         return this.httpClient
  //         .get<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/${id}`, { })
  //         .toPromise();
  //     }

  // public async atualizar(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
  //   data.senha = Md5.hashStr(data.senha).toString().toUpperCase();
  //   return this.httpClient
  //     .put<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/`, data)
  //     .toPromise();
  //  }

  //  public async excluir(data: string): Promise<IBaseModel<IUsuarioModel>> {
  //     return this.httpClient
  //       .delete<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario?id=${data}`)
  //       .toPromise();
  //  }
}
