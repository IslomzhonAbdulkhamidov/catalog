import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ShopRegisterComponent} from './shop-register/shop-register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'shop-register', component: ShopRegisterComponent},
  {path: 'admin-register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'admin-login', component: AdminLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
