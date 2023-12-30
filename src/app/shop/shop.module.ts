import {ShopRoutingModule} from './shop-routing.module';
import {ShopRouteComponent} from './shop-route/shop-route.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';
import {ShopHomeComponent} from './shop-home/shop-home.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditShopProfileComponent} from './edit-shop-profile/edit-shop-profile.component';
import {ShowAllComponent} from './show-all/show-all.component';
import {ShowAllDefaultPhoneComponent} from './show-all-default-phone/show-all-default-phone.component';
import {PreviewPhoneComponent} from './preview-phone/preview-phone.component';
import {SharedModule} from '../shared/shared.module';
import { NotActivePhoneListComponent } from './not-active-phone-list/not-active-phone-list.component';

@NgModule({
  declarations: [
    ShopHomeComponent,
    ShopProfileComponent,
    ShopRouteComponent,
    EditShopProfileComponent,
    ShowAllComponent,
    ShowAllDefaultPhoneComponent,
    PreviewPhoneComponent,
    NotActivePhoneListComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ShopModule {
}
