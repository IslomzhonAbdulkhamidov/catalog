import { FormsModule } from '@angular/forms';
import { ShopModule } from './shop/shop.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MainComponent } from './main/main.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { BrandComponent } from './brand/brand.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AboutUsComponent } from './about-us/about-us.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FAQSComponent } from './faqs/faqs.component';
import { LazyImgDirective } from './lazy-img.directive';
import { SearchResultComponent } from './search-result/search-result.component';
import { ImageLoadDirective } from './image-load.directive';
import { SinglePhoneModule } from './single-phone/single-phone.module';
import { FullPageLayoutComponent } from './layouts/full-page-layout/full-page-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AdminHomeComponent } from './layouts/admin-home/admin-home.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BrandComponent,
    ShopPageComponent,
    AboutUsComponent,
    ErrorPageComponent,
    FAQSComponent,
    LazyImgDirective,
    SearchResultComponent,
    ImageLoadDirective,
    FullPageLayoutComponent,
    HomeLayoutComponent,
    AdminHomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    CoreModule,
    ShopModule,
    SinglePhoneModule,
    MatListModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    NgxPaginationModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
