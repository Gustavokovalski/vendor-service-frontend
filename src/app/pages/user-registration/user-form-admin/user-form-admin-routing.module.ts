import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { UserFormAdminComponent } from './user-form-admin.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'user-form-admin',
      component: UserFormAdminComponent,
      data: { title: marker('Usuários'), profile: 'Admin' },
    },
    {
      path: 'user-form-admin/:id',
      component: UserFormAdminComponent,
      data: { title: marker('Usuários'), profile: ['Admin'] },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserFormAdminRoutingModule {}
