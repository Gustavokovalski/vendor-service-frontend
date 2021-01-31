import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['product', 'quantity', 'unitPrice', 'totalPrice', 'actions'];
  transactions = [
    { product: 'Beach ball', quantity: 4, unitPrice: 4, totalPrice: 16 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
    { product: 'Towel', quantity: 5, unitPrice: 4, totalPrice: 20 },
    { product: 'Frisbee', quantity: 2, unitPrice: 4, totalPrice: 8 },
  ];

  selected = '';
  error: string | undefined;
  orderForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    this.orderForm = this.formBuilder.group({
      emailFormControl: ['', Validators.required],
      quantityFormControl: [''],
    });
  }

  getTotalCost() {
    return this.transactions.map((t) => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  cancel() {
    this.router.navigate([`/order-list`]);
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
