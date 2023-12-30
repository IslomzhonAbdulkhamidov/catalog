import {Shop} from '../../models/shop';
import {ShopService} from '../../services/shop.service';
import {ActivatedRoute} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})
export class ShopProfileComponent implements OnInit {
  shop: Shop;
  count: any;
  constructor(private route: ActivatedRoute,
              private shopService: ShopService,
              private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.shop = this.localStorageService.getShop();
    this.shopService.getShopPhonesCount(this.shop._id).subscribe(res =>{
      this.count = res;
    });
  }

}
