import {AdminHomeComponent} from './admin-home/admin-home.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ListShopsComponent} from './list-shops/list-shops.component';
import {AdminRouteComponent} from './admin-route/admin-route.component';
import {BannerComponent} from './banner/banner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddNewPhoneComponent} from './add-new-phone/add-new-phone.component';
import {ShowPhoneComponent} from './show-phone/show-phone.component';
import {AddNewBrandComponent} from './add-new-brand/add-new-brand.component';
import {SliderComponent} from './slider/slider.component';
import {AddPhoneToShopComponent} from "./add-phone-to-shop/add-phone-to-shop.component";
import { ListShopPhonesComponent } from './list-shop-phones/list-shop-phones.component';
import { AdminProfileEditComponent } from './admin-profile-edit/admin-profile-edit.component';
import { AddDefaultphoneComponent } from './add-defaultphone/add-defaultphone.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FaqsComponent } from './faqs/faqs.component';

@NgModule({
  declarations: [
    ListShopsComponent,
    AddPhoneToShopComponent,
    AdminRouteComponent,
    BannerComponent,
    AdminHomeComponent,
    AddNewPhoneComponent,
    ShowPhoneComponent,
    AddNewBrandComponent,
    SliderComponent,
    ListShopPhonesComponent,
    AdminProfileEditComponent,
    AddDefaultphoneComponent,
    FaqsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    AngularEditorModule

  ],
  schemas: []
})
export class AdminModule {
}
