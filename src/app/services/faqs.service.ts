import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private readonly http: HttpClient) {
  }

  create(faqs) {
    return this.http.post( `${environment.apiEndpoint}api/v1/faqs`, faqs,
      {responseType: 'json', observe: 'body'}
    ).toPromise();
  }

  getFaqs() {
    return this.http.get(`${environment.apiEndpoint}api/v1/getFaqs`)
  }

  update(faqs) {
    return this.http.post(`${environment.apiEndpoint}api/v1/faqs/${faqs._id}`, faqs,
      {responseType: 'json', observe: 'body'}
    ).toPromise();
  }

  socialGoal () {
    return this.http.get(`${environment.apiEndpoint}api/v1/faqs/social-network-goal`)
  }

  admin () {
    return this.http.get(`${environment.apiEndpoint}api/v1/faqs/admin`)
  }

  about () {
    return this.http.get(`${environment.apiEndpoint}api/v1/faqs/about`)
  }

  userAgreement () {
    return this.http.get(`${environment.apiEndpoint}api/v1/faqs/userAgreement`)
  }
  // delete(id: string) {
  //   return this.http.delete<Brand>(`${environment.apiEndpoint}api/v1/brands/${id}`).toPromise();
  // }
}
