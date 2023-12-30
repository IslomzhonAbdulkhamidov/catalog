import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Msg {
  content: string;
  style: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // tslint:disable-next-line:variable-name
  private _msgSource = new Subject<Msg | null>();
  msg = this._msgSource.asObservable();

  constructor() {
  }

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = {content, style};
    this._msgSource.next(msg);
    setTimeout(() => this.clear(), 2500);
  }

  clear() {
    this._msgSource.next(null);
  }
}
