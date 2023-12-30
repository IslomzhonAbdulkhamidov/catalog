import { DefaultPhoneService } from './../services/default-phone.service';
import { ShopService } from './../services/shop.service';
import { Shop } from './../models/shop';
import { Banner1Service } from './../services/banner1.service';
import { Slider } from './../models/slider';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from './../models/brand';
import { Banner } from './../models/banner';
import { BannerService } from './../services/banner.service';
import { Component, OnInit } from '@angular/core';
import { SomeAlgorithmsService } from '../services/some-algorithms.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showSpinner = true;
  sliders: Slider[] = [];
  banners: Banner[] = [];
  brands: Brand[] = [];
  first8brands: Brand[] = [];
  shops: Shop[] = [];
  a = '1';
  trandingProducts = [ [], [], [],[]];

  switt = false;
  constructor(
    private sliderService: BannerService,
    private brandService: BrandService,
    private bannerService: Banner1Service,
    private shopService: ShopService,
    private defaultPhoneService: DefaultPhoneService,
    public someAlgorithmService: SomeAlgorithmsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.defaultPhoneService.getMostPopularPhones().subscribe(res => {
      this.trendingProductsJquery();
      this.divideToFour(res);
    });

    this.sliderService.getData().subscribe((banners) => {
      this.sliderJquery();
        this.sliders = banners.sort(() => Math.random() - 0.5);
        this.sliders = banners.filter((banner: Slider) => banner.isActive === true);
        this.showSpinner = false;      
      });

    this.bannerService.getAllMain().subscribe((banners) => {
      this.banners = banners.sort(() => Math.random() - 0.5)
      this.bannerJquery();
    });

    this.brandService.getDefaultBrands().subscribe((res) => {
      this.brands = res.sort((a: Brand, b: Brand) => {
        // @ts-ignore
        return new Date(a.createdDate) - new Date(b.createdDate);
      }); 
      this.first8brands = this.brands.filter((brand, idx) => idx < 8);
      this.brands.splice(0, 8);
      this.brandLogoJquery();
      this. allJqueryScripts()
    });

    this.shopService.getShops().subscribe((shops) => {
      // this.shops = shops;
      this.ShopLogoJquery();
      this.shops = shops.sort(() => Math.random() - 0.5)
    });
  }

  ngAfterViewInit(){ 
  }

  divideToFour(items) {
    const n = 3;
    const wordsPerLine = Math.ceil(items.length / 3);
    console.log(wordsPerLine)
    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = items[i + line * wordsPerLine];
        if (!value) { continue; } // avoid adding "undefined" values
        this.trandingProducts[line].push(value);
      }
    }


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

  brandLogoJquery() {
     setTimeout(() => {
         $(document).ready(() => {
      const winWidth = $(window).width();
      $('.brand-logo-slider').slick({
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 8000,
        speed: 1000,
        adaptiveHeight: true,
        fade: false,
        easing: 'ease-in-out',
        dots: false,
        arrows: true,
        prevArrow: '<span class="slider-navigation-arrow slider-navigation-prev"><i class="ion ion-ios-arrow-back"></i></span>',
        nextArrow: '<span class="slider-navigation-arrow slider-navigation-next"><i class="ion ion-ios-arrow-forward"></i></span>',
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    });
     },10)
  
  }

  ShopLogoJquery() {
      $(document).ready(() => {
      /* Category Slider 2 */
      $('.categories-slider-2').slick({
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        adaptiveHeight: true,
        fade: false,
        easing: 'ease-in-out',
        dots: false,
        arrows: true,
        prevArrow: '<span class="slider-navigation-arrow slider-navigation-prev"><i class="ion ion-ios-arrow-back"></i></span>',
        nextArrow: '<span class="slider-navigation-arrow slider-navigation-next"><i class="ion ion-ios-arrow-forward"></i></span>',
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    });

    $(document).ready(function() {
      $(".categories-area").delay(1000).fadeIn(500);
    });

  }

  bannerJquery() {
      $(document).ready(() => {
        /* Herobanner Slider */
        $('.herobanner-banner').slick({
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          speed: 1000,
          // adaptiveHeight: true,
          fade: true,
          easing: 'ease-in-out',
          dots: false,
          arrows: true
        });
      });
  }

  sliderJquery() {
    setTimeout(() => {
      $(document).ready(() => {
        /* Herobanner Slider */
        $('.herobanner').slick({
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 500,
          // adaptiveHeight: true,
          fade: true,
          easing: 'ease-in-out',
          dots: true,
          arrows: true,
          prevArrow: '<span class="slider-navigation-arrow slider-navigation-prev"><i class="ion ion-ios-arrow-back"></i></span>',
          nextArrow: '<span class="slider-navigation-arrow slider-navigation-next"><i class="ion ion-ios-arrow-forward"></i></span>',
        });

      });
      $(document).ready(function() {
        $(".herobanner-single").delay(500).fadeIn(500);
    });
    },1000);
  }

  trendingProductsJquery(){
    setTimeout(() => { $(document).ready(() =>{
      /* Trending Product Slider 2 */
      $('.trending-products-slider-2').slick({
        slidesToShow: 3,
        autoplay: false,
        autoplaySpeed: 8000,
        speed: 1000,
        adaptiveHeight: true,
        fade: false,
        easing: 'ease-in-out',
        dots: false,
        arrows: true,
        prevArrow: '<span class="slider-navigation-arrow slider-navigation-prev"><i class="ion ion-ios-arrow-back"></i></span>',
        nextArrow: '<span class="slider-navigation-arrow slider-navigation-next"><i class="ion ion-ios-arrow-forward"></i></span>',
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
  })
   $(document).ready(function() {
    $(".trending-products-area").delay(1000).fadeIn(500);
   });
},100)
   
  }

routeToBrands(brandname: string) {
  this.router.navigate([`/brand/${brandname.toLocaleLowerCase()}`]);
}

routeToPhoneDetail(brand: string, model : string, series:any) {
  series =series.replace(/\s+/g, '-').toLowerCase();
  brand =brand.replace(/\s+/g, '-').toLowerCase();
  model =model.replace(/\s+/g, '-').toLowerCase();
//   console.log(brand+'_'+ model+'_'+ series)
  const a=   brand+'_'+ model+'_'+ series
  this.router.navigate([`/phone-detail//${a}`]);
}
}
