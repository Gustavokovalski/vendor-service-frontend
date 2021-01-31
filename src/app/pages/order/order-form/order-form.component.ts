import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseModel } from '@app/models/base.model';
import { IOrderModel } from '@app/models/order.model';
import { IProductOrderModel } from '@app/models/product-order.model';
import { IProductModel } from '@app/models/product.model';
import { IProductService } from '@app/pages/product/product.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { IOrderService } from '../order.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  public model: IOrderModel = {} as IOrderModel;
  public title: string;
  public productList: IProductModel[];
  public productsAdded: IProductOrderModel[] = [];
  newOrder = true;
  public id: number;
  dataSource: MatTableDataSource<IProductOrderModel>;

  displayedColumns: string[] = ['product', 'quantity', 'productPrice', 'totalPrice', 'actions'];

  selected = null as IProductModel;
  error: string | undefined;

  orderForm = new FormGroup({
    customerEmail: new FormControl('', [Validators.required, Validators.email]),
    productQuantity: new FormControl(''),
    selectedProduct: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: IOrderService,
    private snackBarService: SnackBarService,
    private productService: IProductService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (id) {
      this.id = Number.parseInt(id);
      this.newOrder = false;
      this.title = 'Edição de Pedido';
    } else {
      this.title = 'Criação de Pedido';
    }
  }

  ngOnInit(): void {
    this.getOrder();
  }

  public async getOrder() {
    try {
      await this.productService
        .list()
        .then((res) => {
          debugger;
          this.productList = res.result;
        })
        .catch((err) => {
          throw err;
        });
      if (!this.newOrder) {
        this.service
          .getByOrderId(this.id)
          .then((list) => {
            debugger;
            this.productsAdded = list.result;
            this.productsAdded.forEach((x) => (x.productName = this.productList.find((y) => y.id == x.productId).name));
            this.dataSource = new MatTableDataSource<IProductOrderModel>(this.productsAdded);
          })
          .catch((err) => {
            throw err;
          });

        const res = await this.service.getById(this.id);

        if (res.success) {
          this.model = res.result;
          debugger;
        } else {
          this.snackBarService.openSnackBar(res.message[0].description, 'error');
          this.router.navigate(['/order-list']);
          return;
        }
      }
      this.orderForm.patchValue(this.model);
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
      this.router.navigate(['/order-list']);
    }
  }

  public async onSubmit() {
    debugger;
    if (this.orderForm.invalid) {
      this.snackBarService.openSnackBar('Formulário inválido!', 'warning');
      return;
    }

    if (this.productsAdded.length <= 0) {
      this.snackBarService.openSnackBar('É necessário inserir ao menos um produto no pedido!', 'warning');
      return;
    }

    Object.assign(this.model, this.orderForm.value);
    try {
      this.model.productOrders = this.productsAdded;
      let res: IBaseModel<IOrderModel> = null;
      if (this.newOrder) {
        const date = new Date();
        this.model.purchaseDate = date;
        res = await this.service.create(this.model);
      } else {
        debugger;
        res = await this.service.update(this.model);
      }

      if (res.success) {
        this.snackBarService.openSnackBar(res.message[0].description, 'success');
        this.router.navigate(['/order-list']);
      } else {
        this.snackBarService.openSnackBar(res.message[0].description, 'error');
      }
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
    }
  }

  public getTotalCost() {
    return this.productsAdded != undefined
      ? this.productsAdded.map((t) => t.totalPrice).reduce((acc, value) => acc + value, 0)
      : 0;
  }

  public addProduct() {
    if (this.selected === undefined || this.selected === null) {
      this.snackBarService.openSnackBar('Selecione um produto.', 'warning');
      return;
    }

    if (
      this.orderForm.controls.productQuantity.value === null ||
      this.orderForm.controls.productQuantity.value === '' ||
      this.orderForm.controls.productQuantity.value === 0 ||
      this.orderForm.controls.productQuantity.value < 0
    ) {
      this.snackBarService.openSnackBar('Informe uma quantidade válida.', 'warning');
      return;
    }

    let productAdded: IProductOrderModel = {} as IProductOrderModel;
    productAdded.productId = this.selected.id;
    productAdded.orderId = this.newOrder ? null : this.id;
    productAdded.productName = this.selected.name;
    productAdded.productPrice = this.selected.price;
    productAdded.quantity = this.orderForm.controls.productQuantity.value;
    productAdded.totalPrice = this.orderForm.controls.productQuantity.value * this.selected.price;

    this.productsAdded.push(productAdded);

    this.dataSource = new MatTableDataSource<IProductOrderModel>(this.productsAdded);
  }

  public removeProduct(product: IProductOrderModel) {
    const index: number = this.productsAdded.indexOf(product);
    this.productsAdded.splice(index, 1);
    this.dataSource = new MatTableDataSource<IProductOrderModel>(this.productsAdded);
  }

  public cancel() {
    this.router.navigate([`/order-list`]);
  }

  customerEmail = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
