import { Brand } from './../models/brand';
import { Phone } from './../models/phone';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopPhoneService {
  previewPhone: Phone;
  constructor(private readonly http: HttpClient) {
  }

  addPreview(prevPhone: Phone) {
    this.previewPhone = prevPhone;
  }
  getPreview() {
    return this.previewPhone;
  }
  create(shop: Phone) {
    return this.http.post<any>(
      `${environment.apiEndpoint}api/v1/shop-phones`,
      shop,
      { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  getAllPhone(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/shop-phones`);
  }

  getShopPhones(filter: any){
    return this.http.post<any[]>(`${environment.apiEndpoint}api/v1/shop-phones/query`, filter);
  }

  getFilteredShopPhones(filterOpt: any){
    return this.http.post<any[]>(`${environment.apiEndpoint}api/v1/filtered-shop-phones/query`, filterOpt);
  }

  getCurrentShopPhones(id) {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/get_current_shop_activated_phones/query/${id}`);
  }

  getShopBrands(sellerId: string){
    return this.http.get<Brand[]>(`${environment.apiEndpoint}api/v1/shop-brands/${sellerId}`);
  }

  getAllExistPhoneShops(dfpId: string, filter: any){
    return this.http.post<any[]>(`${environment.apiEndpoint}api/v1/find-shops-by-dfp/${dfpId}`, filter);
  }
  getSingle(id: string) {
    return this.http.get<Phone>(`${environment.apiEndpoint}api/v1/shop-phones/${id}`);
  }

  update(df: Phone, id: string) {
    // console.log(shop)
    return this.http.post<Phone>(`${environment.apiEndpoint}api/v1/shop-phones/${id}`, df, { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  updatePriceExcel(colls) {
    return this.http.post<any>(`${environment.apiEndpoint}api/v1/shop_edit_price_in_excel`, colls);
  }

  delete(id: string) {
    return this.http.delete<any>(`${environment.apiEndpoint}api/v1/shop-phones/${id}`).toPromise();
  }
}
