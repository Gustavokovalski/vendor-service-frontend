import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-user-form-admin',
  templateUrl: './user-form-admin.component.html',
  styleUrls: ['./user-form-admin.component.scss'],
})
export class UserFormAdminComponent implements OnInit {
  public model: IUserModel = {} as IUserModel;
  public selectedAdm: boolean;
  public title: string;
  hidePassword = true;
  hideConfirmation = true;
  newUser = true;
  id: string;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    profileId: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: IUserService,
    private snackBarService: SnackBarService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (id) {
      this.id = id.toString();
      this.newUser = false;
      this.title = 'Edição de conta';
    } else {
      this.title = 'Criação de conta';
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

  public async getUser() {
    try {
      if (!this.newUser) {
        const res = await this.service.getById(this.id);
        if (res.success) {
          this.model = res.result;
          this.selectedAdm = res.result.profileId == 1;
          this.userForm.get('email').disable();
        } else {
          this.snackBarService.openSnackBar(res.message[0].description, 'error');
          this.router.navigate(['/user-list']);
          return;
        }
      }
      this.userForm.patchValue(this.model);
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
      this.router.navigate(['/user-list']);
    }
  }

  public async onSubmit() {
    if (this.userForm.invalid) {
      this.snackBarService.openSnackBar('Formulário inválido!', 'warning');
      return;
    }

    if (this.userForm.controls.password.value !== this.userForm.controls.confirmPassword.value) {
      this.snackBarService.openSnackBar('As senhas não conferem!', 'warning');
      return;
    }
    debugger;
    Object.assign(this.model, this.userForm.value);
    this.model.profileId = Number.parseInt(this.userForm.controls.profileId.value);
    try {
      let res: IBaseModel<IUserModel> = null;
      if (this.newUser) {
        res = await this.service.create(this.model);
      } else {
        debugger;
        res = await this.service.update(this.model);
      }

      if (res.success) {
        this.snackBarService.openSnackBar(res.message[0].description, 'success');
        this.router.navigate(['/user-list']);
      } else {
        this.snackBarService.openSnackBar(res.message[0].description, 'error');
      }
    } catch (err) {
      this.snackBarService.openSnackBar(err.toString(), 'error');
    }
  }

  public cancel() {
    this.router.navigate([`/user-list`]);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  confirmPassword = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
