import { CommonMessages } from './../../const/common';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';
  loadSpin = true;
  errorMessage = '';
  err = false;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.localStorageService.deleteAdmin();
    this.localStorageService.deleteShop();
    this.authService.emailLogin(this.email, this.password)
      .then((res) => {
        this.err = false;
        const id = res;
        this.shopService.getShops().subscribe(res => {
          const shop = res.find(shop => {
            return shop.firebaseId === id;
          });
          if (shop) {
            this.localStorageService.saveShop(shop);
            this.loadSpin = false;
            this.hideModel();
            this.router.navigate(['/shop']);
          } else {
            this.err = true;
            this.errorMessage = CommonMessages['auth/user-does-not-exists'];
          }
          // TODO: save shop to localstorage
        });
      }).catch((err) => {
        this.err = true;
        if (err.code === 'auth/wrong-password') {
          this.errorMessage = CommonMessages['auth/wrong-password'];
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = CommonMessages['auth/invalid-email'];
        }
        else if (err.code === 'auth/user-not-found') {
          this.errorMessage = CommonMessages['auth/user-not-found'];
        }
        // do nothing
      });
  }

  get isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }

  register() {
    this.router.navigate(['/register']);
  }

  public hideModel() {
    this.closeModal.nativeElement.click();
  }

}
