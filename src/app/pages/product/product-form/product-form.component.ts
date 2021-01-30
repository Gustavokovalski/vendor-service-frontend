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
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  error: string | undefined;
  loginForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  cancel() {
    this.router.navigate([`/product-list`]);
  }

  nameFormControl = new FormControl('', [Validators.required, Validators.email]);

  priceFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
