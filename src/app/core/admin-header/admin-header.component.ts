import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { DefaultPhone } from './../../models/default-phone';
import { LocalStorageService } from './../../services/local-storage.service';
import { Shop } from './../../models/shop';
import { ShopService } from './../../services/shop.service';
import { Brand } from './../../models/brand';
import { BrandService } from 'src/app/services/brand.service';
import * as core from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FaqsService } from 'src/app/services/faqs.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  isUserLoggedIn = false;
  isActive = false;
  brands = [[], [], []];
  shops: Shop[] = [];
  defaultPhones: DefaultPhone[] = [];
  admin: any;
  constructor(
    private authService: AuthService,
    private brandService: BrandService,
    private shopService: ShopService,
    private localStorageService: LocalStorageService,
    private defPhoneService: DefaultPhoneService,
    private router: Router,
    private faqsService: FaqsService
  ) {}

  ngOnInit(): void {
        this.brandService.getDefaultBrands().subscribe((res: Brand[]) => {
      this.divideToThree(res);
    });

    this.shopService.getShops().subscribe((res: Shop[]) => {
      this.shops = res;
      // console.log(this.shops);
    });

    this.faqsService.admin().subscribe((res) => {
      this.admin = res;
    });
  }

 
  get isShopIn(): boolean {
    const shop = this.localStorageService.getShop();
    if (shop) {
      return true;
    }
    return false;
  }

  get isAdminIn(): boolean {
    const admin = this.localStorageService.getAdmin();
    if (admin) {
      return true;
    }
    return false;
  }

  logout() {
    this.authService.signOut();
  }

  displayMenu() {
    this.isActive = !this.isActive;
  }

  divideToThree(items) {
    const n = 3;
    const wordsPerLine = Math.ceil(items.length / 3);
    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = items[i + line * wordsPerLine];
        if (!value) {
          continue;
        } // avoid adding "undefined" values
        this.brands[line].push(value);
      }
    }
  }

  routeToShop(id: string) {
    // console.log('click');
    // this.router.navigate([`/shop-page/${id}`]);
    this.router.navigate([`/shop-page/${id}`]).then(() => {
      window.location.reload();
    });
  }

  routeToBrand(brandname: string) {
    // console.log('click');
    this.router
      .navigate([`/brand/${brandname.toLocaleLowerCase()}`])
      .then(() => {
        window.location.reload();
      });
  }

  navigate() {
    const location = this.router.url;
    if (location === '/main') {
      window.location.reload();
    }
    this.router.navigateByUrl('main');
  }
}
