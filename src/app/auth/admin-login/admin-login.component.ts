import { CommonMessages } from './../../const/common';
import { User } from './../../models/user';
import { AdminService } from './../admin.service';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public email = '';
  public password = '';
  loadSpin = true;
  errorMessage = '';
  err = false;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.localStorageService.deleteAdmin();
    this.localStorageService.deleteShop();
    this.authService.emailLogin(this.email, this.password)
      .then((res) => {
        const id = res;
        this.adminService.getData().subscribe(users => {
          // tslint:disable-next-line: no-shadowed-variable
          const user = users.find((user: User) => user.uid === id);
          if (user) {
            this.localStorageService.saveAdmin(user);
            // TODO: save shop to localstorage
            this.router.navigateByUrl(`/admin/route/list-shops`);
            this.loadSpin = false;
            this.hideModel();
          } else{
            this.err = true;
            this.errorMessage = CommonMessages['auth/user-does-not-exists-as-admin'];
          }

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

  public hideModel() {
    this.closeModal.nativeElement.click();
  }

}
