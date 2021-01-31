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
  selector: 'app-user-form-admin',
  templateUrl: './user-form-admin.component.html',
  styleUrls: ['./user-form-admin.component.scss'],
})
export class UserFormAdminComponent implements OnInit {
  hidePassword = true;
  hideConfirmation = true;
  userForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
    confirmPasswordFormControl: new FormControl('', Validators.required),
    profileFormControl: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate([`/user-list`]);
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl = new FormControl('', [Validators.required]);

  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
