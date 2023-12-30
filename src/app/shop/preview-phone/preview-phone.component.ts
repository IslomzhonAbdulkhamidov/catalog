import { LocalStorageService } from './../../services/local-storage.service';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { Phone, PhoneCollection } from './../../models/phone';
import { ShopPhoneService } from './../../services/shop-phone.service';
import { DefaultPhone, DefaulPhoneColor } from './../../models/default-phone';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-preview-phone',
  templateUrl: './preview-phone.component.html',
  styleUrls: ['./preview-phone.component.scss']
})
export class PreviewPhoneComponent implements OnInit {
  defaultPhoneId: string;
  sellerId: string;
  newPhone = new Phone();
  dfPhone: DefaultPhone;
  brand: Brand;
  Object = Object;
  editConfirmed = false;
  sa: object;
  sim: object;

  //// 
  updateConfirmed = false
  collection = new PhoneCollection();
  constructor(
    private phoneService: ShopPhoneService,
    private dfPhoneService: DefaultPhoneService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.defaultPhoneId = params.get('defaultPhoneId');
      const phoneid = params.get('phoneId');
      if (phoneid !== null && phoneid.length > 0) {
        this.editConfirmed = true;
        this.phoneService.getSingle(phoneid).subscribe(res => {
          this.newPhone = res;
          this.defaultPhoneId = res.defaultPhoneId;
          this.dfPhoneService.getSingle(this.defaultPhoneId).subscribe(
            (df: DefaultPhone) => {
              this.dfPhone = df;
              this.alljQueryScripts();
            });
        });
      }
      else if (this.defaultPhoneId !== null && this.defaultPhoneId.length > 0) {
        this.dfPhoneService.getSingle(this.defaultPhoneId).subscribe(
          (df: DefaultPhone) => {
            this.dfPhone = df;
            this.alljQueryScripts();
            this.brand = this.dfPhone.brandId
          });
      }

    });
    this.sellerId = this.localStorageService.getShop()._id;
  }

  createNewPhone() {
    this.newPhone.defaultPhoneId = this.defaultPhoneId;
    this.newPhone.sellerId = this.sellerId;
    this.newPhone.isActive = true;
    this.phoneService.create(this.newPhone).then(res => {
      this.router.navigate(['/shop/list-phones']);
    });
  }

  editPhone(phone: Phone) {
    this.phoneService.update(phone, phone._id).then(() => {
      this.router.navigateByUrl('/shop/list-phones');
        });
  }

  isIn(e, color: DefaulPhoneColor) {
    const classList = e.target.classList;
    const classes = e.target.className;
      if (this.collection.color && this.collection.color.some(cl => cl.hex === color.hex) && classes.includes('circle')) {
      const index = this.collection.color.indexOf(color);
      this.collection.color.splice(index,1)
      classList.remove('circle')
      classList.add('square');

    }
    if (!this.collection.color || this.collection.color.length === 0) {
      this.collection.color = [];
      this.collection.color.push(color);
      classes.includes('circle') ? classList.remove('circle') : classList.add('circle');
    }
    if (!this.collection.color.some(cl => cl.hex === color.hex) && !classes.includes('circle') ) {
      this.collection.color.push(color);
      classes.includes('circle') ? classList.remove('circle') : classList.add('circle');
    }
  }

  alljQueryScripts() {
    $(document).ready(function () {
      /* Product Details Slider Image */
      $('.pdetails-sliderimages').slick({
        slidesToShow: 3,
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
          breakpoint: 992,
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

      /* Product Details Zoom */
      $('.pdetails-imagezoom').lightGallery({
        selector: '.pdetails-singleimage'
      });

      $('.pdetails-largeimages').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.pdetails-thumbs'
      });

      $('.pdetails-thumbs:not(.pdetails-thumbs-vertical)').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.pdetails-largeimages',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        vertical: false
      });

      $('.pdetails-thumbs-vertical').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.pdetails-largeimages',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        vertical: true,
        responsive: [{
          breakpoint: 576,
          settings: {
            vertical: false,
          }
        }]
      });
    });

  }

  isMemorySelected(memory, storage) {
    memory.forEach(item => {
      return JSON.stringify(item) === JSON.stringify(storage)
    });
  }

  // get isCompleted() {
  //   if (this.newPhone?.price > 0 && this.newPhone?.currency.length > 0 && this.newPhone?.color.length > 0 && this.newPhone?.memory) {
  //     return true;
  //   } else { return false; }
  // }

  addCollection() {
    if(!this.newPhone.phoneCollection) {
      this.newPhone.phoneCollection = [];
      this.newPhone.phoneCollection.push(this.collection);
    } else {
      this.newPhone.phoneCollection.push(this.collection);
    }
    this.collection = new PhoneCollection();
    var buttons = document.getElementsByClassName('square');
    for (let index = 0; index < buttons.length; index++) {
      var i = buttons[index];
      i.classList.remove('circle')
    }

  }

  deleteCollection(coll) {
    const index = this.newPhone.phoneCollection.indexOf(coll);
    this.newPhone.phoneCollection.splice(index,1)
    this.collection = coll;
    this.updateConfirmed = true;
  }

  deleteColor(color) {
  const index = this.collection.color.indexOf(color);
  this.collection.color.splice(index,1) }

  memory(mem){
    // console.log(mem)
  }
}
