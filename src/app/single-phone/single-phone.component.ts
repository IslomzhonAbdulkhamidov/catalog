import { Phone } from './../models/phone';
import { ShopPhoneService } from './../services/shop-phone.service';
import { Brand } from './../models/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultPhoneService } from './../services/default-phone.service';
import { DefaultPhone } from './../models/default-phone';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SomeAlgorithmsService } from '../services/some-algorithms.service';

declare var $: any;
export interface PriceFilter {
  memory?:string;
  color?: string;
  colorName?: string;
}
@Component({
  selector: 'app-single-phone',
  templateUrl: './single-phone.component.html',
  styleUrls: ['./single-phone.component.scss']
})
export class SinglePhoneComponent implements OnInit {
  dfPhone: DefaultPhone;
  phone: Phone;
  id: string;
  brand: Brand;
  Object = Object;
  phonePriceMin: any;
  phonePriceMax: any;
  phonePriceInShops: any;

  // get prices by memory and color
  priceFilter: PriceFilter = {
    memory: '',
    color: '',
    colorName: 'Все цветa'
  }; 

  /// new 
  selectedColor= '';
  selectedMemory: any;

  priceGetSpinner = false;
  shareLink =''
  memory: any = 0
  currentRoute = ''
  currentPhoneTitle = ''
  constructor(
    private defaultPhoneService: DefaultPhoneService,
    private route: ActivatedRoute,
    private phoneService: ShopPhoneService,
    private router: Router,
    private meta: Meta,
    private someAlgorithms: SomeAlgorithmsService) { 

  }

  ngOnInit(): void {
    this.currentRoute ='https://www.katalog.kg'+ this.router.url
    this.route.paramMap.subscribe(params => {
      this.id = params.get('phoneid');
      this.defaultPhoneService.getSinglePhoneUser(this.id).subscribe(res => {
        if(!res) {
          this.router.navigateByUrl('**')
        } else {
          this.dfPhone = res;
          this.shareLink = this.dfPhone?.brandId?.name+" "+this.dfPhone?.series+" "+this.dfPhone?.model
          this.alljQueryScripts();
          this.meta.updateTag(
            { property: "og:title", content: this.shareLink }
          );
          this.meta.updateTag(
            { property: "og:description", content: 'Ищите все у нас!!!' }
          );
          this.meta.updateTag( 
            { property: "og:image", content: this.dfPhone.images[0] }
          )

          if(!this.priceFilter.memory ) {
            const a = this.dfPhone.memories.find(el => {return el?.isExists === true})
            this.priceFilter.memory = a.memoryStorage+'_'+a.ramStorage;
            this.memory = a.memoryStorage;
          }
        }
      });
    });

    this.route.queryParamMap.subscribe((params) => {
      if(!params.get('color')) {
        this.priceFilter.color = ''
      }
      this.priceFilter.color = params.get('color');
      this.selectedColor = this.priceFilter.color
      this.priceFilter.memory = params.get('memory')
      this.selectedMemory = this.priceFilter.memory
      if(this.priceFilter.memory) {
        this.memory = this.priceFilter.memory.split('_')[0]
      }
      this.phoneService.getAllExistPhoneShops(this.id, this.priceFilter ).subscribe(res => {
        this.getMinMaxPriceForPhone(res);
        res.sort((a, b) => parseInt(a.price)- parseInt(b.price))
        this.phonePriceInShops = res;
        this.priceGetSpinner = false;
      });
      this.currentPhoneTitle = this.dfPhone?.brandId?.name+" "+this.dfPhone?.series+" "+this.dfPhone?.model+' '+ this.memory+ 'ГЫб'
    });


  }

  alljQueryScripts() {
    // $(document).ready(function() {
    //   $('.pdetails-largeimages').slick("unslick")} )
          // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      // $('.pdetails-thumbs-vertical').slick("slickRemove")
      // $('.pdetails-largeimages').slick("slickRemove")

      /* Product Details Slider Image */
      $('.pdetails-sliderimages').not('.slick-initialized').slick({
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
      // $('.pdetails-largeimages').slick('reinit');
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

  getMinMaxPriceForPhone(shops) {
    if(shops.length > 0) {
      shops = shops.sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10));
    }
// console.log(shops[shops.length-1],shops[0])
    this.phonePriceMax = shops[shops.length-1];
    this.phonePriceMin = shops[0];
  }

  getFilteredPrices(){
    let memory;
    const encodedUri = encodeURIComponent(JSON.stringify(this.priceFilter));
    this.priceGetSpinner = true;
    if(!this.selectedMemory?.memoryStorage) {
      memory = this.priceFilter.memory
      this.memory= this.priceFilter.memory.split('_')[0]
    } else {
       memory = this.selectedMemory.memoryStorage +'_'+ this.selectedMemory.ramStorage
      this.memory = this.selectedMemory.memoryStorage
      console.log(this.memory, this.selectedColor)
    } 
    this.router.navigate([`/phone-detail/${this.id}`], { queryParams: {color: this.selectedColor, memory: memory} });
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
  }

  iscorrect(a, b) {
    return a === b;
  }

  memoryCorrect(a,b) {
    return a === b.memoryStorage+'_'+b.ramStorage
  }

  routeToShop(_id: string){
    this.router.navigateByUrl(`/shop-page/${_id}`);
  }
}
