import { AboutUsComponent } from './about-us/about-us.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { BrandComponent } from './brand/brand.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ShopHomeComponent } from './shop/shop-home/shop-home.component';
import { ShowAllComponent } from './shop/show-all/show-all.component';
import { ShowAllDefaultPhoneComponent } from './shop/show-all-default-phone/show-all-default-phone.component';
import { PreviewPhoneComponent } from './shop/preview-phone/preview-phone.component';
import { NotActivePhoneListComponent } from './shop/not-active-phone-list/not-active-phone-list.component';
import { EditShopProfileComponent } from './shop/edit-shop-profile/edit-shop-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { IsActivatedGuard } from './guard/is-activated.guard';
import { FAQSComponent } from './faqs/faqs.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { FullPageLayoutComponent } from './layouts/full-page-layout/full-page-layout.component';
import { AdminHomeComponent } from './layouts/admin-home/admin-home.component';

const singlePhoneModule = () =>
  import('./single-phone/single-phone.module').then(
    (module) => module.SinglePhoneModule
  );

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent, pathMatch: 'full' },
      { path: 'about', component: AboutUsComponent },
      { path: 'brand/:brandname', component: BrandComponent },
      { path: 'shop-page/:sellerId', component: ShopPageComponent },
      { path: 'phone-detail/:phoneid', loadChildren: singlePhoneModule },
      { path: 'search', component: SearchResultComponent },
    ],
  },
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      {
        path: 'shop',
        component: ShopHomeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [IsActivatedGuard],
        children: [
          { path: 'list-phones', component: ShowAllComponent },
          {
            path: 'list-default-phones',
            component: ShowAllDefaultPhoneComponent,
          },
          {
            path: 'preview-default-phone/:defaultPhoneId',
            component: PreviewPhoneComponent,
          },
          { path: 'edit-phone/:phoneId', component: PreviewPhoneComponent },
          {
            path: 'not-active-phone-list',
            component: NotActivePhoneListComponent,
          },
          // {
          //   path: 'price-editor-shop',
          //   loadChildren: () =>
          //     import(
          //       './shop/price-editor-excel/price-editor-excel.module'
          //     ).then((module) => module.PriceEditorExcelModule),
          // },
        ],
      },
      { path: 'shop/edit-profile', component: EditShopProfileComponent },
      // Super Administrator routes
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((module) => module.AdminModule),
      },
    ],
  },
  {
    path: '',
    component: FullPageLayoutComponent,
    children: [
      {
        path: 'price-editor-shop',
        loadChildren: () =>
          import('./shop/price-editor-excel/price-editor-excel.module').then(
            (module) => module.PriceEditorExcelModule
          ),
      },
    ],
  },
  // // Shop Administrator routes
  { path: 'faqs', component: FAQSComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
