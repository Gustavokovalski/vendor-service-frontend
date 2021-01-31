import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'user-list', component: UserListComponent, data: { title: marker('Usuários'), profile: 'Admin' } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserListRoutingModule {}
