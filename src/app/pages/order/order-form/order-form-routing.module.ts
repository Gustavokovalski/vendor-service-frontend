import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { OrderFormComponent } from './order-form.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'order-form',
      component: OrderFormComponent,
      data: { title: marker('Pedidos'), profile: ['Admin', 'Employee'] },
    },
    {
      path: 'order-form/:id',
      component: OrderFormComponent,
      data: { title: marker('Pedidos'), profile: ['Admin', 'Employee'] },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrderFormRoutingModule {}
