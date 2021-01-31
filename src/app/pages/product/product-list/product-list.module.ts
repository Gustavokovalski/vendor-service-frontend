import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormRoutingModule } from '@app/pages/user-registration/user-form/user-form-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    UserFormRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    ProductListRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  declarations: [ProductListComponent],
})
export class ProductListModule {}
