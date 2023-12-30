import {Shop} from '../models/shop';
import {LocalStorageService} from '../services/local-storage.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {NotificationService} from '../core/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class IsActivatedGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    private localStorageService: LocalStorageService
  ) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const shop: Shop = this.localStorageService.getShop();
    if (shop) {
      // TODO: check if shop is activated
      if (shop.activated === false) {
        window.alert('Ваше аккаунт не активировано, пожалуйста обращайтесь к админу.');
        // this.notify.update('Пожалуйста contact to admin.', 'error');
        this.router.navigate(['/shop']);
        return false;
      }
      return true;
    }
    window.alert('Что-то пошло не так пожалуйста войдите в систему еще раз.');
    // this.notify.update('Пожалуйста, войдите.', 'error');
    this.router.navigate(['/login']);
    return false;
  }
}
