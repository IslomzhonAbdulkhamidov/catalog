import { ShopPhoneService } from './../services/shop-phone.service';
import { Phone } from './../models/phone';
import { ShopService } from './../services/shop.service';
import { Shop } from './../models/shop';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from './../models/brand';
import { Component, OnInit } from '@angular/core';
import { SomeAlgorithmsService } from '../services/some-algorithms.service';
declare var $: any;


export interface ShopFilter {
  sellerId?: string;
  colors?: string[];
  price?: {
    low: number,
    high: number,
  };
  rams?: string[];
  memories?: string[];
  brandId?: string[];
  producedDate?: number;
}
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  config: any;
  sellerId: string;
  shop: Shop;
  shopPhones: any[] = [];
  shopBrands: Brand[] = [];
  spinner = true
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private shopPhoneService: ShopPhoneService,
    public someAlgorithmService: SomeAlgorithmsService) {
    this.config = {
      currentPage: 1,
      view: 'grid',
      itemsPerPage: 15,
      totalItems: 0,
      filter: 'popular'
    };
    this.route.paramMap.subscribe(params => {
      this.sellerId = params.get('sellerId');
      this.shopService.getSingleShop(this.sellerId).subscribe((shop: Shop) => {
        this.shop = shop;
      });

    });
    this.route.queryParamMap.subscribe((params) => {
      const queryParams = params.get('filterOptions');
      this.config.currentPage = params.get('page') ? params.get('page') : 1;
      this.config.view = params.get('view') ? params.get('view'): 'grid';
      // this.config.filter = params.get('filter')? params.get('filter'): 'popular'
      if(params.get('view')){
        this.spinner = true
      }
      const decodedUri = decodeURIComponent(queryParams);
      this.shopPhoneService.getCurrentShopPhones(this.sellerId).subscribe(res => {
        this.shopPhones = res; 
        this.filterProducts('0')
        this.alljQueryScripts();
        this.spinner =false;
      });

    });

  }

  ngOnInit(): void {
  }

  alljQueryScripts() {
    $(document).ready(() => {
      const x = document.getElementsByClassName("is-active")[0].getAttribute("data-view");
      if (x === 'list') {
        $('.shop-page-products').addClass('list-view-active');
        $('.product-description__grid').hide();
        $('.product-description__list').show();
        $('.product-title__grid').hide();
        $('.product-title__list').show();
        $('.product-content__grid').show();
      } else {
        $('.shop-page-products').removeClass('list-view-active');
        $('.product-description__grid').show();
        $('.product-description__list').hide();
        $('.product-content__grid').hide();
        $('.product-title__grid').show();
        $('.product-title__list').hide();
      }
      /* Product Viewmode */
      $('.shop-filters-viewmode').on('click', 'button', function () {
        $(this).addClass('is-active').siblings().removeClass('is-active');

        const dataView = $(this).data('view');
        
        if (dataView === 'list') {
          $('.shop-page-products').addClass('list-view-active');
          $('.product-description__grid').hide();
          $('.product-description__list').show();
          $('.product-title__grid').hide();
          $('.product-title__list').show();
          $('.product-content__grid').show();
        } else {
          $('.shop-page-products').removeClass('list-view-active');
          $('.product-description__grid').show();
          $('.product-description__list').hide();
          $('.product-content__grid').hide();
          $('.product-title__grid').show();
          $('.product-title__list').hide();
        }
      });
      /* Select Sortby */
      $('.select-sortby-current').on('click', () => {
        $('.select-sortby-list').slideToggle();
      });
    });
  }

  pageChange(newPage: number) {
    const x = document.getElementsByClassName("is-active")[0].getAttribute("data-view");
    this.config.view = x
    this.router.navigate([`/shop-page/${this.sellerId}`], { queryParams: { page: newPage, view: this.config.view } });
  }

  filterProducts(value: string) {     
    if(value === "popular") {
      this.shopPhones.sort((a, b) => parseInt(a.pageViewCount)- parseInt(b.pageViewCount))
    } else if(value === "low-high" ){
      this.shopPhones.sort((a, b) => parseInt(a.price.low)- parseInt(b.price.low))
    } else if (value ==='high-low') {
      this.shopPhones.sort((a, b) => parseInt(b.price.low)- parseInt(a.price.low))
    } else if(value === "created-date") {
      this.shopPhones.sort((val1, val2)=> <any>new Date(val1.updatedDate).getTime() - <any>new Date(val2.updatedDate).getTime() )
    }
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
