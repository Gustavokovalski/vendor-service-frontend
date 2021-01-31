import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { IBaseModel } from '@app/models/base.model';
import { IUserModel } from '@app/models/user.model';
import { SnackBarService } from 'src/services/snackbar.service';
import { IUserService } from '../user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public model: IUserModel = {} as IUserModel;
  hidePassword = true;
  hideConfirmation = true;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  });

  constructor(private router: Router, private service: IUserService, private snackBarService: SnackBarService) {}

  ngOnInit(): void {}

  public async onSubmit() {
    if (this.userForm.invalid) {
      this.snackBarService.openSnackBar('Formulário inválido!', 'warning');
      return;
    }

    if (this.userForm.controls.password.value !== this.userForm.controls.confirmPassword.value) {
      this.snackBarService.openSnackBar('As senhas não conferem!', 'warning');
      return;
    }

    Object.assign(this.model, this.userForm.value);
    this.model.profileId = 3;
    try {
      let res: IBaseModel<IUserModel> = null;

      res = await this.service.create(this.model);

      if (res.success) {
        this.snackBarService.openSnackBar(res.message[0].description, 'success');
        this.router.navigate(['/login']);
      } else {
        this.snackBarService.openSnackBar(res.message[0].description, 'error');
      }
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
    }
  }

  public cancel() {
    this.router.navigate([`/`]);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  confirmPassword = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
