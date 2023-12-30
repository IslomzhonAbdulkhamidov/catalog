import { ShopPhoneService } from './../../services/shop-phone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from './../../models/phone';
import { Brand } from './../../models/brand';
import { DefaulPhoneColor, DefaultPhone } from './../../models/default-phone';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStorageService } from '../../services/local-storage.service';

declare var $: any;

@Component({
  selector: 'app-show-all-default-phone',
  templateUrl: './show-all-default-phone.component.html',
  styleUrls: ['./show-all-default-phone.component.scss']
})
export class ShowAllDefaultPhoneComponent implements OnInit {
  dfcolors = [
    {
      hex: '#000000',
      name: 'Черный'
    },
    {
      hex: '#ffffff',
      name: 'Белый'
    },
    {
      hex: '#0000ee',
      name: 'Синий'
    },
    {
      hex: '#ee0000',
      name: 'Красный'
    },
    {
      hex: '#00ee00',
      name: 'Зеленый'
    },
    {
      hex: '#eec900',
      name: 'Золотой'
    },
    {
      hex: '#c0c0c0',
      name: 'Серебряный'
    },
    {
      hex: '#ffb5c5',
      name: 'Розовый'
    },
    {
      hex: '#a020f0',
      name: 'Пурпурный'
    },
    {
      hex: '#ffff00',
      name: 'Желтый'
    },
    {
      hex: '#ff7f50',
      name: 'Коралловый'
    }

  ];
  defaultPhones: DefaultPhone[] = [];
  brands: Brand[] = [];
  addNewConfirmed = false;
  addedDefasultPhone: DefaultPhone;
  newPhone = new Phone();
  shopId: string;
  brandId: string;
  selectedBrand: any;
  series: string;
  brandSeries = [];
  constructor(
    private defaultPhoneService: DefaultPhoneService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private phoneService: ShopPhoneService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.shopId = this.localStorageService.getShop()._id
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.brandId = params.get('brandID');
      const series = params.get('series');
      if (this.brandId && series && series !== 'All') {
        this.defaultPhoneService.getDefaultPhoneByBrandIdAndSeries(this.brandId, series).subscribe(defaultPhones => {
          this.defaultPhones = defaultPhones;
          // console.log(this.defaultPhones);
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
          // console.log(this.defaultPhones);
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

  isIn(e, color: DefaulPhoneColor) {
    const classList = e.target.classList;
    const classes = e.target.className;
    classes.includes('circle') ? classList.remove('circle') : classList.add('circle');
    if (!this.newPhone.color || this.newPhone.color.length === 0) {
      this.newPhone.color = [];
      this.newPhone.color.push(color);
    }
    if (!this.newPhone.color.some(cl => cl.hex === color.hex)) {
      this.newPhone.color.push(color);
    }
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
      this.router.navigate(['/shop/list-default-phones']);
    }
    if (this.brandId !== 'all' && this.series.length > 0){
      this.router.navigate(['/shop/list-default-phones'], { queryParams: { brandID: this.brandId, series: this.series  } });
    }
    if (this.series.length <= 0 && this.brandId !=='all'){
      this.router.navigate(['/shop/list-default-phones'], { queryParams: { brandID: this.brandId} });
  }
  }
}
