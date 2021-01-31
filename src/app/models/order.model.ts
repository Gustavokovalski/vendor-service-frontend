import { IProductOrderModel } from './product-order.model';

export interface IOrderModel {
  id: string;
  customerEmail: string;
  purchaseDate: Date;
  productOrders: IProductOrderModel[];
  orderTotalPrice: any;
}
