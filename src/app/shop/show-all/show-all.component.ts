import {Phone} from './../../models/phone';
import {ShopPhoneService} from './../../services/shop-phone.service';
import {Brand} from './../../models/brand';
import {DefaultPhoneService} from './../../services/default-phone.service';
import {DefaultPhone} from './../../models/default-phone';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from 'src/app/services/brand.service';
import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import { SomeAlgorithmsService } from 'src/app/services/some-algorithms.service';

declare var $: any;

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.scss']
})
export class ShowAllComponent implements OnInit {
  brands: Brand[] = [];
  defaultPhones: DefaultPhone[] = [];
  brandId = '';
  loadingSpinner = true;
  allPhone: Phone[] = [];
  sellerId: string;
  dfphone: DefaultPhone;
  selectedBrand: any;
  // brandId: string;
  series: string;
  brandSeries = [];
  updatePhone: Phone;
  updateConfirmed = false;
  constructor(
    private route: ActivatedRoute,
    private defaultPhoneService: DefaultPhoneService,
    private phoneService: ShopPhoneService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public someAlgorithmsService: SomeAlgorithmsService
  ) {
  }

  ngOnInit(): void {
    this.sellerId = this.localStorageService.getShop()._id;
    this.phoneService.getShopBrands(this.sellerId).subscribe(res => {
      this.brands = res;
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.brandId = params.get('brandID');
      const series = params.get('series');
      const filter = {
        isActive: true,
        sellerId: this.sellerId,
        brandId: this.brandId,
        series,
      };
      this.phoneService.getShopPhones(filter).subscribe((phones) => {
        this.allPhone = phones;
        console.log(this.allPhone);
      });
    });

    this.alljQueryScripts();
  }

  alljQueryScripts() {
    $(document).ready(() => {
      /* Product Viewmode */
      $('.shop-filters-viewmode').on('click', 'button', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');

        const dataView = $(this).data('view');

        if (dataView === 'list') {
          $('.shop-page-products').addClass('list-view-active');
        } else {
          $('.shop-page-products').removeClass('list-view-active');
        }
      });

      /* Select Sortby */
      $('.select-sortby-current').on('click', () => {
        $('.select-sortby-list').slideToggle();
      });
    });
  }

  deletePhone(phone: Phone) {
    this.phoneService.delete(phone._id).then(() => {
      this.allPhone = this.allPhone.filter(ph => ph._id !== phone._id);
    });
  }

  routeToEdit(id: string) {
    this.router.navigateByUrl(`/shop/edit-phone/${id}`);
  }

  filterByBrand(brId: string) {
    if (brId !== 'all') {
      this.brandId = brId;
      this.selectedBrand = this.brands.filter(br => br._id === brId);
      this.selectedBrand = this.selectedBrand[0];
      (document.getElementById('two') as any).disabled = false;
      this.brandSeries = this.selectedBrand.series;
    } else {
      (document.getElementById('two') as any).disabled = true;
      this.brandId = brId;
      this.brandSeries = [];

    }
    console.log(this.brandId, this.series);

  }

  getByBrandId() {
    // if(this.series === 'All'){
    //   this.router.navigate(['/shop/list-phones'], {queryParams: {brandID: this.brandId}});
    // })
    if (this.brandId === 'all') {
      this.router.navigate(['/shop/list-phones']);
    }
    if (this.brandId !== 'all' && this.series) {
      this.router.navigate(['/shop/list-phones'], {queryParams: {brandID: this.brandId, series: this.series}});
    }
    if (!this.series || this.series === 'All' && this.brandId !== 'all') {
      this.router.navigate(['/shop/list-phones'], {queryParams: {brandID: this.brandId}});
    }
  }

  changePhoneActivation(phone: Phone){
    this.updatePhone = phone;
    this.updateConfirmed = true;
  }

  editPhone(){
    this.phoneService.update(this.updatePhone, this.updatePhone._id).then(() => {
      this.allPhone = this.allPhone.filter(ph => ph._id !== this.updatePhone._id);
    });

  }
}
