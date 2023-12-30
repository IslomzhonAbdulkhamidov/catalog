import { User } from './../models/user';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router, UrlTree } from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../core/notification/notification.service';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private notify: NotificationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const admin: User = this.localStorageService.getAdmin();
      if (admin) {
        return true;
      }
      // window.alert('Что-то пошло не так пожалуйста войдите в систему еще раз.');
      // this.notify.update('Пожалуйста, войдите.', 'error');
      this.router.navigate(['/main']);
      return false;
  }

}
