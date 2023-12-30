import { Brand } from './../models/brand';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private readonly http: HttpClient) {
  }

  create(shop:Brand ) {
    return this.http.post<Brand>(
      `${environment.apiEndpoint}api/v1/brands`,
      shop,
      {responseType: 'json', observe: 'body'}
    ).toPromise();
  }

  getDefaultBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.apiEndpoint}api/v1/brands`);
  }

  getSingleBrand(id: string) {
    return this.http.get<Brand>(`${environment.apiEndpoint}api/v1/brands/${id}`)
  }

  update(shop: Brand) {
    return this.http.post<Brand>(
      `${environment.apiEndpoint}api/v1/brands/${shop._id}`, shop,
      {responseType: 'json', observe: 'body'}
    ).toPromise();
  }

  delete(id: string) {
    return this.http.delete<Brand>(`${environment.apiEndpoint}api/v1/brands/${id}`).toPromise();
  }


  //// for users 

  getSingleBrandForUser(brandname: string) {
    return this.http.get<Brand>(`${environment.apiEndpoint}api/v1//user-select-brand/${brandname}`)
  }
}
