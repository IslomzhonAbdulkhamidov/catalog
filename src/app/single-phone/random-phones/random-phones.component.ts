import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
declare var $: any;

@Component({
  selector: 'app-random-phones',
  templateUrl: './random-phones.component.html',
  styleUrls: ['./random-phones.component.scss']
})
export class RandomPhonesComponent implements OnInit {
  shops: Shop[] = [];

  constructor(private shopService: ShopService,
    private router: Router) { }

  ngOnInit(): void {
    this.shopService.getRandomPhones().subscribe(res => {
      this.ShopLogoJquery();
      this.shops =res
    })
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

routeToPhoneDetail(brand: string, model : string, series:any) {
  series =series.replace(/\s+/g, '-').toLowerCase();
  brand =brand.replace(/\s+/g, '-').toLowerCase();
  model =model.replace(/\s+/g, '-').toLowerCase();
//   console.log(brand+'_'+ model+'_'+ series)
  const a=   brand+'_'+ model+'_'+ series
  this.router.navigate([`/phone-detail//${a}`]).then(() => {window.location.reload();})
}
}
