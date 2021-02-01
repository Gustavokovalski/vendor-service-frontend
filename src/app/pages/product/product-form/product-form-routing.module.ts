import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ProductFormComponent } from './product-form.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'product-form',
      component: ProductFormComponent,
      data: { title: marker('Produtos'), profile: ['Admin', 'Employee'] },
    },
    {
      path: 'product-form/:id',
      component: ProductFormComponent,
      data: { title: marker('Produtos'), profile: ['Admin', 'Employee'] },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProductFormRoutingModule {}
