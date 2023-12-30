import {Injectable} from '@angular/core';
import {Shop} from '../models/shop';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  shopKey = 'currentUser';
  adminKey = 'currentAdmin';

  constructor() {
  }

  getShop(): Shop | undefined {
    const userAsString = localStorage.getItem(this.shopKey);
    if (!userAsString) {
      return undefined;
    }
    return JSON.parse(userAsString);
  }

  saveShop(shop: Shop) {
    const userAsString = JSON.stringify(shop);
    localStorage.setItem(this.shopKey, userAsString);
  }

  deleteShop() {
    localStorage.removeItem(this.shopKey);
  }

  getAdmin(): User | undefined {
    const userAsString = localStorage.getItem(this.adminKey);
    if (!userAsString) {
      return undefined;
    }
    return JSON.parse(userAsString);
  }

  saveAdmin(admin: User) {
    const userAsString = JSON.stringify(admin);
    localStorage.setItem(this.adminKey, userAsString);
  }

  deleteAdmin() {
    localStorage.removeItem(this.adminKey);
  }

}
