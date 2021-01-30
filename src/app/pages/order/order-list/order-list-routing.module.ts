import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { OrderListComponent } from './order-list.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'order-list', component: OrderListComponent, data: { title: marker('Pedidos') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrderListRoutingModule {}
