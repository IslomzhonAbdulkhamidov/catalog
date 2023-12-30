import { NotActivePhoneListComponent } from './not-active-phone-list/not-active-phone-list.component';
import { IsActivatedGuard } from '../guard/is-activated.guard';
import { AuthGuard } from '../guard/auth.guard';
import { PreviewPhoneComponent } from './preview-phone/preview-phone.component';
import { ShowAllDefaultPhoneComponent } from './show-all-default-phone/show-all-default-phone.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { EditShopProfileComponent } from './edit-shop-profile/edit-shop-profile.component';
import { ShopHomeComponent } from './shop-home/shop-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'shop', component: ShopHomeComponent, canActivate: [AuthGuard], canActivateChild: [IsActivatedGuard],
  //   children: [
  //     {path: 'list-phones', component: ShowAllComponent},
  //     {path: 'list-default-phones', component: ShowAllDefaultPhoneComponent},
  //     {path: 'preview-default-phone/:defaultPhoneId', component: PreviewPhoneComponent},
  //     {path: 'edit-phone/:phoneId', component: PreviewPhoneComponent},
  //     {path: 'not-active-phone-list', component: NotActivePhoneListComponent }
  //   ]
  // },
  // {path: 'shop/edit-profile', component: EditShopProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
