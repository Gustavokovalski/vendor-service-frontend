import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormModule } from './pages/user-registration/user-form/user-form.module';
import { ProductListModule } from './pages/product/product-list/product-list.module';
import { ProductFormModule } from './pages/product/product-form/product-form.module';
import { OrderListModule } from './pages/order/order-list/order-list.module';
import { OrderFormModule } from './pages/order/order-form/order-form.module';
import { UserListModule } from './pages/user-registration/user-list/user-list.module';
import { UserFormAdminModule } from './pages/user-registration/user-form-admin/user-form-admin.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    ProductListModule,
    ProductFormModule,
    OrderListModule,
    OrderFormModule,
    UserListModule,
    UserFormAdminModule,
    AuthModule,
    UserFormModule,

    AppRoutingModule,
    BrowserAnimationsModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
