import { DefaultPhone } from './../models/default-phone';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultPhoneService {
  // public searchOption = [];
  // public dfsData: DefaultPhone[];
  constructor(private readonly http: HttpClient) {
  }

  create(shop: DefaultPhone) {
    return this.http.post<any>(
      `${environment.apiEndpoint}api/v1/default-phones`,
      shop,
      { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  getDefaultPhone(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/default-phones`);
  }

  getSearchValue() {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1//list-of-all-defaultPhone-brand`);
  }

  getDefaultPhoneByBrandId(brandId: string){
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/list-default-phones/${brandId}`);
  }

  getFilterDefaultPhone(filter){
    return this.http.post<any[]>(`${environment.apiEndpoint}api/v1/default-phones/query`, filter);
  }

  getDefaultPhoneByBrandIdAndSeries(brandId: string , series: string){
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/filter-list-default-phones/${brandId}/${series}`);
  }

  getBySearchValue(text) {
    // console.log(text)
    return this.http.post<any[]>(`${environment.apiEndpoint}api/v1/searchDefaultPhone`,text)
  }
  getSingle(id: string) {
    return this.http.get<DefaultPhone>(`${environment.apiEndpoint}api/v1/default-phones/${id}`);
  }

  getSinglePhoneUser(name: string) {
    return this.http.get<DefaultPhone>(`${environment.apiEndpoint}api/v1/get_defaoultPhone/${name}`);
  }

  update(df: DefaultPhone, id: string) {
    // console.log(shop)
    return this.http.post<DefaultPhone>(`${environment.apiEndpoint}api/v1/default-phones/${id}`, df , { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  delete(id: string) {
    return this.http.delete<any>(`${environment.apiEndpoint}api/v1/default-phones/${id}`).toPromise();
  }

  getMostPopularPhones(){
    return this.http.get<DefaultPhone[]>(`${environment.apiEndpoint}api/v1/popular-phones`);
  }
}
