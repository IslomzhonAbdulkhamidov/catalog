import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';
import {NotificationService} from '../core/notification/notification.service';
import { ShopRegisterComponent } from './shop-register/shop-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
    ShopRegisterComponent,
    AdminLoginComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
  ],
  providers: [
    NotificationService,
    AuthService,
  ],
})
export class AuthModule {
}
