import {DefaultPhone} from './../models/default-phone';
import {DefaultPhoneService} from './../services/default-phone.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from 'src/app/services/brand.service';
import {Brand} from './../models/brand';
import {Component, OnInit} from '@angular/core';

declare var $: any;

export interface BrandFilter {
  colors?: string[];
  price?: {
    low: number,
    high: number,
  };
  producedDate?: number;
  brandId?: string;
  rams?: string[];
  memories?: string[];
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  config: any;
 
  currentBrand: Brand;
  defaultPhones: DefaultPhone[] = [];
  brandId: string;
  // price = {low: 0, high: 80000};

  defaultFilter: BrandFilter = {
    price: {
      low: 0,
      high: 10000000,
    },
    colors: [],
    memories: [],
    rams: [],
    producedDate: null
  };

  brandPageFilter: BrandFilter = this.defaultFilter;

  spinner = true;
  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private defaultPhoneService: DefaultPhoneService,
    private router: Router) {
    this.config = {
      currentPage: 1,
      view: 'grid',
      itemsPerPage: 15,
      totalItems: 0
    };

    this.route.paramMap.subscribe(params => {
      this.brandId = params.get('brandname');
      this.brandService.getSingleBrandForUser(this.brandId).subscribe(brand => {
        this.currentBrand = brand;
      });
    });
    this.route.queryParamMap.subscribe((params) => {
      const queryParams = params.get('filterOptions');
      this.config.currentPage = params.get('page') ? params.get('page') : 1;
      this.config.view = params.get('view') ? params.get('view'): 'grid';
      if(params.get('view')){
        this.spinner = true
      }
      const decodedUri = decodeURIComponent(queryParams);
      this.brandPageFilter = JSON.parse(decodedUri) || this.defaultFilter;
      this.brandPageFilter.brandId = this.brandId;
      this.defaultPhoneService.getFilterDefaultPhone(this.brandPageFilter).subscribe((res: DefaultPhone[]) => {
        this.defaultPhones = res;
        this.filterProducts('0')
        this.alljQueryScripts();
        this.spinner = false
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
  
  getBrandDefaultPhoneByFilterOptions() {
    // console.log(this.brandPageFilter);
    const encodedUri = encodeURIComponent(JSON.stringify(this.brandPageFilter));
    // console.log(encodedUri);
    this.spinner = true
    this.router.navigate([`/brand/${this.brandId}`], {queryParams: {filterOptions: encodedUri}});
  }

  routeToPhoneDetail(brand: string, model : string, series:any) {
    series =series.replace(/\s+/g, '-').toLowerCase();
    brand =brand.replace(/\s+/g, '-').toLowerCase();
    model =model.replace(/\s+/g, '-').toLowerCase();
  //   console.log(brand+'_'+ model+'_'+ series)
    const a=   brand+'_'+ model+'_'+ series
    this.router.navigate([`/phone-detail//${a}`]);
  }

  routeToShopPage(Id: string){
    this.router.navigateByUrl(`/shop-page/${Id}`);
  }

  pageChange(newPage: number){
    const x = document.getElementsByClassName("is-active")[0].getAttribute("data-view");
    this.config.view = x
    const encodedUri = encodeURIComponent(JSON.stringify(this.brandPageFilter));
    this.router.navigate([`/brand/${this.brandId}`], {queryParams: {page: newPage, view: this.config.view}});
  }

  filterProducts(value: string) {
    if(value === "0") {
      this.defaultPhones.sort((a, b) => a?.pageViewCounter- b.pageViewCounter)
    }else if(value === "1" ){
      this.defaultPhones.sort((a, b) => parseInt(a?.price.low)- parseInt(b.price.low))
    } else if (value ==='2') {
      this.defaultPhones.sort((a, b) => parseInt(b.price.low)- parseInt(a.price.low))
    } else if(value === "3") {
      this.defaultPhones.sort((val1, val2)=> <any>new Date(val1.defaultUpdatedDate).getTime() - <any>new Date(val2.defaultUpdatedDate).getTime() )
    }
  }
}
