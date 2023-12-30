import { Banner } from './../models/banner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Banner1Service {
  path = 'banner';

  constructor(private readonly http: HttpClient) { 
  }

  getAll() {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/all-banners`);
  }

  getAllMain() {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/all-main-banners`)
  }

  getAllSingle() {
    return this.http.get<any[]>(`${environment.apiEndpoint}api/v1/all-single-banners`)
  }

  createBanner(banner: Banner) {
    return this.http.post<Banner>(
      `${environment.apiEndpoint}api/v1/banner`,
      banner,
      { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  updateBanner(id: string, banner: Banner) {
    return this.http.post<Banner>(`${environment.apiEndpoint}api/v1/banner/${id}`, banner, { responseType: 'json', observe: 'body' }
    ).toPromise();
  }

  deleteBanner(id) {
    return this.http.delete<any>(`${environment.apiEndpoint}api/v1/banner/${id}`).toPromise();
  }
}
