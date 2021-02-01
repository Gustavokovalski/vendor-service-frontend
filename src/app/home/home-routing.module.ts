import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    // { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: marker('Home'), profile: ['Admin', 'Employee'] } },
    { path: 'home', component: HomeComponent, data: { title: marker('Home'), profile: ['Admin', 'Employee'] } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
