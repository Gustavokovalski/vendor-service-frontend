import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseModel } from '@app/models/base.model';
import { IProductModel } from '@app/models/product.model';
import { SnackBarService } from 'src/services/snackbar.service';
import { IProductService } from '../product.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public model: IProductModel = {} as IProductModel;
  public title: string;
  id: number;
  error: string | undefined;
  newProduct = true;
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: IProductService,
    private snackBarService: SnackBarService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (id) {
      this.id = Number.parseInt(id);
      this.newProduct = false;
      this.title = 'Edição de Produto';
    } else {
      this.title = 'Criação de Produto';
    }
  }

  ngOnInit(): void {
    this.getProduct();
  }

  public async getProduct() {
    try {
      if (!this.newProduct) {
        const res = await this.service.getById(this.id);
        if (res.success) {
          this.model = res.result;
        } else {
          this.snackBarService.openSnackBar(res.message[0].description, 'error');
          this.router.navigate(['/product-list']);
          return;
        }
      }
      this.productForm.patchValue(this.model);
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
      this.router.navigate(['/product-list']);
    }
  }

  public async onSubmit() {
    if (this.productForm.invalid) {
      this.snackBarService.openSnackBar('Formulário inválido!', 'warning');
      return;
    }

    Object.assign(this.model, this.productForm.value);
    this.model.active = true;
    try {
      let res: IBaseModel<IProductModel> = null;

      if (this.newProduct) {
        res = await this.service.create(this.model);
      } else {
        res = await this.service.update(this.model);
      }

      if (res.success) {
        this.snackBarService.openSnackBar(res.message[0].description, 'success');
        this.router.navigate(['/product-list']);
      } else {
        this.snackBarService.openSnackBar(res.message[0].description, 'error');
      }
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
    }
  }

  cancel() {
    this.router.navigate([`/product-list`]);
  }

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
