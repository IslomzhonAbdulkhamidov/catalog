import { AuthService } from './../../auth/auth.service';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from './../../models/shop';
import { LocalStorageService } from './../../services/local-storage.service';
declare var $: any;
@Component({
  selector: 'app-shop-route',
  templateUrl: './shop-route.component.html',
  styleUrls: ['./shop-route.component.css']
})
export class ShopRouteComponent implements OnInit {
  brands: Brand[] = [];
  currentShop: Shop;
  constructor(
    private brandService: BrandService,
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
    this.brandService.getDefaultBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  ngOnInit() {
    this.currentShop = this.localStorageService.getShop();
    this.allJqueryScripts()
  }
  logOut() {
    this.authService.signOut();
  }

  allJqueryScripts() {
    $(document).ready(function () {
      const winWidth = $(window).width();
      // Toggle Category Menu
      $('.catmenu-trigger').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $(this).siblings('.catmenu-body').slideToggle();
      });
      $('.catmenu-trigger.is-active').siblings('.catmenu-body').slideDown();
      // Category Menu More
      $('.catmenu-moretrigger a').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.catmenu').find('.catmenu-hidden').slideToggle();
      });
      // Mobile Attitude
      if (winWidth < 992) {

        $('.catmenu-body').find('.megamenu').removeClass('megamenu');
        $('.catmenu-body').find('.catmenu-megamenu').removeClass('catmenu-megamenu');
        $('.catmenu-body').find('.catmenu-dropdown').removeClass('catmenu-dropdown');

        $('.catmenu-body').find('li').each(function () {
          if ($(this).children('ul').length) {
            $(this).addClass('has-children');
            $(this).children('a').on('click', function (e) {
              e.preventDefault();
              $(this).parent('li').toggleClass('is-active');
              $(this).siblings('ul').slideToggle();
            });
          }
        });

        $('.catmenu-2').find('.catmenu-trigger').removeClass('is-active');
        $('.catmenu-2').find('.catmenu-body').css('display', 'none');
      }

    });

  }
}
