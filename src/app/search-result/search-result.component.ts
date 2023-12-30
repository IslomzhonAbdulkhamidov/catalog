import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultPhone } from '../models/default-phone';
import { DefaultPhoneService } from '../services/default-phone.service';
declare var $: any;

export interface Search {
  text: string;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  config: any;
  defaultPhones: DefaultPhone[];
  search: Search = {
    text: ''
  }

  spinner = true;
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private defaultPhoneService: DefaultPhoneService
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage:15,
      totalItems: 0
    };
   }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const queryParams = params.get('filterOptions');
      this.config.currentPage = params.get('page') ? params.get('page') : 1;
      const decodedUri = decodeURIComponent(queryParams);
      this.search.text = params.get('value')
      this.defaultPhoneService.getBySearchValue(this.search).subscribe((res) => {
        this.defaultPhones = res;
        this.alljQueryScripts()
        this.spinner = false        
        })
    });
  }

  alljQueryScripts() {
    $(document).ready(() => {
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
          $('.product-title__grid').show();
          $('.product-title__list').hide();
          $('.product-content__grid').hide();
        }
      });

      /* Select Sortby */
      $('.select-sortby-current').on('click', () => {
        $('.select-sortby-list').slideToggle();
      });
    });
  }
  // routeToPhoneDetail(defautPhoneId: string){
  //   this.router.navigateByUrl(`/phone-detail/${defautPhoneId}`);
  // }
  pageChange(newPage: number){
    this.router.navigate([`/search/`], {queryParams: {value: this.search.text, page: newPage}});
  }

  routeToPhoneDetail(brand: string, model : string, series:any) {
    series =series.replace(/\s+/g, '-').toLowerCase();
    brand =brand.replace(/\s+/g, '-').toLowerCase();
    model =model.replace(/\s+/g, '-').toLowerCase();
  //   console.log(brand+'_'+ model+'_'+ series)
    const a=   brand+'_'+ model+'_'+ series
    this.router.navigate([`/phone-detail//${a}`]);
  }

  filterProducts(value: string) {
    if(value === "1" ){
      this.defaultPhones.sort((a, b) => parseInt(a?.price.low)- parseInt(b.price.low))
    } else if (value ==='2') {
      this.defaultPhones.sort((a, b) => parseInt(b.price.low)- parseInt(a.price.low))
    } else if(value === "3") {
      this.defaultPhones.sort((val1, val2)=> <any>new Date(val1.defaultUpdatedDate).getTime() - <any>new Date(val2.defaultUpdatedDate).getTime() )
    }
  }
}
