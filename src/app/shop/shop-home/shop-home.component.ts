import { Shop } from './../../models/shop';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ShopPhoneService } from '../../services/shop-phone.service';
declare let $: any;
@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
})
export class ShopHomeComponent implements OnInit {
  shop: Shop;
  location: any;
  routerSubscription: any;
  dfcolors = [
    {
      hex: '#000000',
      name: 'Black - Черный',
    },
    {
      hex: '#ffffff',
      name: 'White - Белый',
    },
    {
      hex: '#0000ee',
      name: 'Blue - Синий',
    },
    {
      hex: '#ee0000',
      name: 'Red - Красный',
    },
    {
      hex: '#00ee00',
      name: 'Green - Зеленый',
    },
    {
      hex: '#eec900',
      name: 'Gold - Золотой',
    },
    {
      hex: '#c0c0c0',
      name: 'Silver - Серебряный',
    },
    {
      hex: '#ffb5c5',
      name: 'Pink - Розовый',
    },
    {
      hex: '#a020f0',
      name: 'Purple - Пурпурный',
    },
    {
      hex: '#ffff00',
      name: 'Yellow - Желтый',
    },
    {
      hex: '#ff7f50',
      name: 'Coral - Коралловый',
    },
  ];
  constructor(
    private localStorageService: LocalStorageService,
    private shopService: ShopPhoneService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.shop = this.localStorageService.getShop();
    // let phoneCol = [];
    // const phones = JSON.parse(localStorage.getItem('tabled'));
    // for (const brand of phones) {
    //   for (const model of brand.__children) {
    //     const phoneCollection  =  this.generatePhoneCollection(model, model.id, this.shop._id, model.phoneExist);
    //     if (phoneCollection._id !== null || phoneCollection.phoneCollection.length) {
    //       phoneCol = [...phoneCol, phoneCollection];
    //     }
    //   }
    // }
    // console.log(phoneCol)
    // localStorage.setItem('colls', JSON.stringify(phoneCol))
  }

  
}
