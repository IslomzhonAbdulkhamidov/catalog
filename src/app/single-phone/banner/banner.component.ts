import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { Banner1Service } from 'src/app/services/banner1.service';
declare var $: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banners: Banner[] = [];

    constructor( private bannerService: Banner1Service) { }

  ngOnInit(): void {
    this.bannerService.getAllSingle().subscribe((banners) => {
      this.banners = banners.sort(() => Math.random() - 0.5)
      this.bannerJquery();
    });
  }

  bannerJquery() {
    $(document).ready(() => {
      /* Herobanner Slider */
      $('.herobanner-banner').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        // adaptiveHeight: true,
        fade: true,
        easing: 'ease-in-out',
        dots: false,
        arrows: true
      });
    });
}

}
