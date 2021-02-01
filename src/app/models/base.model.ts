import { IEnumModel } from './enum.model';

export interface IBaseModel<T> {
  success: boolean;
  message: IEnumModel[];
  result: T;
  validationResult: any;

  page: number;
  pageSize: number;
  totalRegistros: number;
  totalPaginas: number;
}
