import { Router, ActivatedRoute } from '@angular/router';
import { Brand } from './../../models/brand';
import { DefaultPhone } from './../../models/default-phone';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
declare var $: any;

@Component({
  selector: 'app-show-phone',
  templateUrl: './show-phone.component.html',
  styleUrls: ['./show-phone.component.scss']
})
export class ShowPhoneComponent implements OnInit {
  defaultPhones: DefaultPhone[] = [];
  brands: Brand[] = [];
  brandSeries = [];
  selectedBrand: any;
  brandId: string;
  series: string;
  deletedPhoneId:string;
  constructor(
    private defaultPhoneService: DefaultPhoneService,
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.brandId = params.get('brandID');
      const series = params.get('series');
      if (this.brandId && series && series !== 'All') {
        this.defaultPhoneService.getDefaultPhoneByBrandIdAndSeries(this.brandId, series).subscribe(defaultPhones => {
          this.defaultPhones = defaultPhones;
          console.log(this.defaultPhones);
        }); }
      if (this.brandId && !series) {
        this.defaultPhoneService.getDefaultPhoneByBrandId(this.brandId).subscribe(defaultPhones => {
          this.defaultPhones = defaultPhones;
          // console.log(this.defaultPhones);
        
        });
      }
      if (!this.brandId && !series) {
        this.defaultPhoneService.getDefaultPhone().subscribe((defaultPhone) => {
          this.defaultPhones = defaultPhone;
        });
      }
    });

    this.alljQueryScripts();
    this.brandService.getDefaultBrands()
      .subscribe((res) => {
        this.brands = res;
      });
  }

  alljQueryScripts() {
    $(document).ready(function() {
      /* Product Viewmode */
      $('.shop-filters-viewmode').on('click', 'button', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');

        // tslint:disable-next-line: prefer-const
        let dataView = $(this).data('view');

        if (dataView == 'list') {
          $('.shop-page-products').addClass('list-view-active');
        } else {
          $('.shop-page-products').removeClass('list-view-active');
        }
      });

      /* Select Sortby */
      $('.select-sortby-current').on('click', function() {
        $('.select-sortby-list').slideToggle();
      });

    });
  }

  edit(defaultPhone: DefaultPhone) {

  }
  deleteDefaultPhone($event: DefaultPhone) {
   this.deletedPhoneId = $event._id;
  }

  deleteConfirm() {
    this.defaultPhoneService.delete(this.deletedPhoneId).then(() => {
      this.defaultPhones = this.defaultPhones.filter((f) => f._id !== this.deletedPhoneId);
      // console.log('Deleted');
    }).catch((err) => {
      console.log(err);
    });
  }

  // navigate to "add new phone to shop"
  addPhonetoShop(defaultPhoneId: string) {
    this.router.navigateByUrl(`/admin/route/add-phone-to-shop/${defaultPhoneId}`);
  }

  filterByBrand(brId: string) {
    if (brId !== 'all') {
      this.brandId = brId;
      this.series = '';
      this.selectedBrand = this.brands.filter(br => br._id === brId);
      this.selectedBrand = this.selectedBrand[0];
      (document.getElementById('two') as any).disabled = false;
      this.brandSeries = this.selectedBrand.series;
    } else {
      (document.getElementById('two') as any).disabled = true;
      this.brandId = brId;
      this.brandSeries = [];
    }
  }

  getByBrandId() {
    if (this.brandId === 'all'){
      this.router.navigate(['/admin/route/show-all-phone']);
    }
    if (this.brandId !== 'all' && this.series.length > 0){
      this.router.navigate(['/admin/route/show-all-phone'], { queryParams: { brandID: this.brandId, series: this.series  } });
    }
    if (this.series.length <= 0 && this.brandId !=='all'){
      this.router.navigate(['/admin/route/show-all-phone'], { queryParams: { brandID: this.brandId} });
  }
  }
}
