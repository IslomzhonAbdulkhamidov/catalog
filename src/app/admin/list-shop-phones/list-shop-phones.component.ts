import { ShopService } from './../../services/shop.service';
import { Shop } from './../../models/shop';
import { Phone } from './../../models/phone';
import { ShopPhoneService } from './../../services/shop-phone.service';
import { Brand } from './../../models/brand';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { DefaultPhone } from './../../models/default-phone';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { SomeAlgorithmsService } from 'src/app/services/some-algorithms.service';
declare var $: any;

@Component({
  selector: 'app-list-shop-phones',
  templateUrl: './list-shop-phones.component.html',
  styleUrls: ['./list-shop-phones.component.scss']
})
export class ListShopPhonesComponent implements OnInit {
  brands: Brand[] = [];
  defaultPhones: DefaultPhone[] = [];
  brandId = '';
  loadingSpinner = true;
  allPhone: Phone[] = [];
  sellerId: string;
  dfphone: DefaultPhone;
  selectedBrand: any;
  allShops: Shop[] = [];
  series: string;
  brandSeries = [];
  deletedPhoneId: string;

  constructor(
    private brandService: BrandService,
    private phoneService: ShopPhoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    public someAlgorithmService: SomeAlgorithmsService
  ) {
  }

  ngOnInit(): void {
    this.shopService.getShops().subscribe(res => {
      this.allShops = res;
      // console.log(this.allShops);
    });
    this.brandService.getDefaultBrands().subscribe(res => {
      this.brands = res;
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.brandId = params.get('brandID');
      const series = params.get('series');
      this.sellerId = params.get('shop');
      const filter = {
        sellerId: this.sellerId,
        brandId: this.brandId,
        series: series
      };
      if (!this.brandId && !series && !this.sellerId) {
        this.phoneService.getShopPhones(filter).subscribe(res => {
          this.allPhone = res;
          // console.log(res);

        });
      } else {
        this.phoneService.getShopPhones(filter).subscribe((phones) => {
          this.allPhone = phones;
          // console.log(this.allPhone);
        });
      }


    });

    this.alljQueryScripts();
  }

  alljQueryScripts() {
    $(document).ready(() => {
      /* Product Viewmode */
      $('.shop-filters-viewmode').on('click', 'button', function () {
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
    this.deletedPhoneId = phone._id;
  }

  deleteConfirm() {
    this.phoneService.delete(this.deletedPhoneId).then(() => {
      this.allPhone = this.allPhone.filter(ph => ph._id !== this.deletedPhoneId);
    }).catch((err) => {
      console.log(err);
    });
  }
  routeToEdit(id: string) {
    // this.router.navigateByUrl(`/admin/route/edit-shop-phone/${id}`);
    this.router.navigate([`/admin/route/edit-shop-phone/${id}`]);
  }

  filterByBrand(brId: string) {
    if (brId !== 'all') {
      this.brandId = brId;
      this.selectedBrand = this.brands.filter(br => br._id === brId);
      this.selectedBrand = this.selectedBrand[0];
      (document.getElementById('two') as any).disabled = false;
      this.brandSeries = this.selectedBrand.series;
    }
    else if (brId === 'all') {
      this.brandId = undefined;
      this.series = undefined;
      (document.getElementById('two') as any).disabled = true;
    } else {
      this.brandId = brId;
      this.brandSeries = [];

    }

  }

  getByBrandId() {
    if (this.sellerId === 'all') {
      this.router.navigate(['/admin/route/list-shop-phones'], { queryParams: { brandID: this.brandId, series: this.series } });

    }
    this.router.navigate(['/admin/route/list-shop-phones'], { queryParams: { shop: this.sellerId, brandID: this.brandId, series: this.series } });
  }

  get isSellerIDAdded() {
    return this.sellerId?.length > 0 && this.sellerId !== 'all';
  }
}
