import { CommonMessages } from './../../const/common';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  styleUrls: ['./shop-register.component.scss']
})
export class ShopRegisterComponent implements OnInit {

  public fullName = '';
  public email = '';
  public password = '';
  loadSpin = true;
  errorMessage = '';
  err = false;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.authService.emailSignUp(this.email, this.password, this.fullName, 'shop')
      .then((shop) => {
        this.localStorageService.saveShop(shop);
        this.loadSpin = false;
        this.hideModel();
        this.router.navigate(['/shop']);
      }).catch((err) => {
        this.err = true;
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = CommonMessages['auth/email-already-in-use'];
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = CommonMessages['auth/invalid-email'];
        }
        else if (err.code === 'auth/weak-password') {
          this.errorMessage = err.message;
        }
      });
  }

  isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0 && this.fullName.length > 0;
  }

  login() {
    this.router.navigate(['/login']);
  }

  public hideModel() {
    this.closeModal.nativeElement.click();
  }

}
