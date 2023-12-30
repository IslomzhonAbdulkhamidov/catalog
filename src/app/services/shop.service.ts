import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shop } from '../models/shop';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private readonly http: HttpClient) {
  }

  create(shop: Shop) {
    return this.http.post<Shop>(
      `${environment.apiEndpoint}api/v1/shops`, shop,
      { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environment.apiEndpoint}api/v1/shops`);
  }
  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environment.apiEndpoint}api/v1/all-shops`);
  }

  getSingleShop(id: string): Observable<Shop> {
    return this.http.get<Shop>(`${environment.apiEndpoint}api/v1/shops/${id}`);
  }

  getShopPhonesCount(sellerId: string){
    return this.http.get<any>(`${environment.apiEndpoint}api/v1/shop-phones-count/${sellerId}`);
  }
  update(shop: Shop) {
    return this.http.post<Shop>(
      `${environment.apiEndpoint}api/v1/shops/${shop._id}`, shop,
      { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  delete(id: string) {
    return this.http.delete<Shop>(`${environment.apiEndpoint}api/v1/shops/${id}`).toPromise();
  }

  getSingleShopForUser(shopname: string) {
    return this.http.get<Shop>(`${environment.apiEndpoint}api/v1//user-select-shop/${shopname}`)
  }

  getRandomPhones() {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/random-phones`);
  }

  // table data editing
  getAllPhoneModel(shopId: string) {
    return this.http.get<any>(`${environment.apiEndpoint}api/v1/shop_all_phone_price/${shopId}`);
  }
}
