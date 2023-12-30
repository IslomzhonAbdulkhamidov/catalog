import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NotificationService} from '../core/notification/notification.service';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private notify: NotificationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const shop = this.localStorageService.getShop();
    if (shop) {
      return true;
    }
    window.alert('Что-то пошло не так пожалуйста войдите в систему еще раз.');
    // this.notify.update('Пожалуйста, войдите.', 'error');
    this.router.navigate(['/login']);
    return false;
  }
}
