import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { OrderListComponent } from './order-list.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/order-list',
      pathMatch: 'full',
      data: { title: marker('Pedidos'), profile: ['Admin', 'Employee', 'Customer'] },
    },
    {
      path: 'order-list',
      component: OrderListComponent,
      data: { title: marker('Pedidos'), profile: ['Admin', 'Employee', 'Customer'] },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrderListRoutingModule {}
