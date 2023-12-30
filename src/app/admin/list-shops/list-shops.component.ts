import { User } from './../../models/user';
import { AdminService } from './../../auth/admin.service';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../models/shop';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {

  shops: Shop[] = [];
  shop = new Shop();
  updateConfirmed = false;
  admins: User[] = [];
  admin = new User();
  deleteShopConfirmedId: string;
  deleteAdminConfirmedID: string;
  constructor(
    private shopService: ShopService,
    private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.shopService.getAllShops().subscribe((shops) => {
      this.shops = shops;
    });
    this.adminService.getData().subscribe(users => {
      this.admins = users;
      // console.log(this.admins);
    });
  }

  editShopUser(shop: Shop) {
    this.updateConfirmed = true;
    this.shop = shop;
  }

  updateShopStatus() {
    this.shopService.update(this.shop).then(res => {
      console.log('Updated');
    });
  }

  deleteShop(id: string) {
    this.deleteShopConfirmedId = id;
    this.deleteAdminConfirmedID = '';
  }

  editAdminUser(admin: User) {
    this.updateConfirmed = true;
    this.admin = admin;
  }

  updateAdminStatus(admin: User) {
    this.adminService.update(admin.uid, admin).then(() => console.log('Updated'));
  }

  deleteAdmin(id: string) {
    this.deleteAdminConfirmedID = id;
    this.deleteShopConfirmedId = '';
  }

  deleteConfirm() {
    if (this.deleteAdminConfirmedID.length > 0){
      this.adminService.deleteById(this.deleteAdminConfirmedID).then(() => {
        this.admins = this.admins.filter(admin => admin.uid !== this.deleteAdminConfirmedID);
      });
    } else if (this.deleteShopConfirmedId.length > 0){
      this.shopService.delete(this.deleteShopConfirmedId).then(res => {
        this.shops = this.shops.filter(shop => shop._id !== this.deleteShopConfirmedId);
      });
    }
  }

}
