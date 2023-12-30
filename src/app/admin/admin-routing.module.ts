import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminChildGuard } from '../guard/admin-child.guard';
import { AdminGuard } from '../guard/admin.guard';
import { AddDefaultphoneComponent } from './add-defaultphone/add-defaultphone.component';
import { AddNewBrandComponent } from './add-new-brand/add-new-brand.component';
import { AddNewPhoneComponent } from './add-new-phone/add-new-phone.component';
import { AddPhoneToShopComponent } from './add-phone-to-shop/add-phone-to-shop.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileEditComponent } from './admin-profile-edit/admin-profile-edit.component';
import { BannerComponent } from './banner/banner.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ListShopPhonesComponent } from './list-shop-phones/list-shop-phones.component';
import { ListShopsComponent } from './list-shops/list-shops.component';
import { ShowPhoneComponent } from './show-phone/show-phone.component';
import { SliderComponent } from './slider/slider.component';
const routes: Routes = [
      {path: 'route', component: AdminHomeComponent, canActivate: [AdminGuard], canActivateChild: [AdminChildGuard],
      children: [
        {path: 'list-shops', component: ListShopsComponent },
        {path: 'list-banners', component: BannerComponent },
        {path: 'list-sliders', component: SliderComponent },
        {path: 'add-new', component: AddNewPhoneComponent },
        {path: 'show-all-phone', component: ShowPhoneComponent },
        {path: 'update-default-phone/:id', component: AddNewPhoneComponent },
        {path: 'add-new-brand', component: AddNewBrandComponent},
        {path: 'add-phone-to-shop/:defaultPhoneId', component: AddPhoneToShopComponent},
        {path: 'edit-shop-phone/:phoneId', component: AddPhoneToShopComponent },
        {path: 'list-shop-phones', component: ListShopPhonesComponent},
        {path: 'edit-profile', component: AdminProfileEditComponent},
        {path: 'new-dd', component: AddDefaultphoneComponent},
        {path: 'faqs', component: FaqsComponent}
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
