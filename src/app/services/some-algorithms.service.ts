import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { DefaultPhone } from '../models/default-phone';
import { PhoneCollection } from '../models/phone';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SomeAlgorithmsService {

  constructor(private router: Router, private readonly http: HttpClient) {

}

  priceMinMax(array: PhoneCollection[]) {
    let ans = {min:0, max:0};
    let all = []
    array.forEach( element => {
      all.push(element.price)
    })
    all = all.sort((n1,n2) => n1 - n2);
    ans.min = all[0];
    ans.max = all[all.length-1]
    return ans.min.toString() +' до '+ ans.max.toString() +' сом'
  }
  
}
