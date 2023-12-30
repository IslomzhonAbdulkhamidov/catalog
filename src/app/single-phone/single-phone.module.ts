import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePhoneRoutingModule } from './single-phone-routing.module';
import { SinglePhoneComponent } from './single-phone.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { BannerComponent } from './banner/banner.component';
import { RandomPhonesComponent } from './random-phones/random-phones.component';

@NgModule({
  declarations: [
    SinglePhoneComponent,
    BannerComponent,
    RandomPhonesComponent
  ],
  imports: [
    CommonModule,
    SinglePhoneRoutingModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ]
})
export class SinglePhoneModule { }
