import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { UserFormComponent } from './user-form.component';

const routes: Routes = [
  // Shell.childRoutes([
  //     { path: 'user-registration', component: UserFormComponent, data: { title: marker('User') } },
  // ]),
  { path: 'user-registration', component: UserFormComponent },
];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserFormRoutingModule {}
