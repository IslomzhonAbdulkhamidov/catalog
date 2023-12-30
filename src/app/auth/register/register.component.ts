import { CommonMessages } from './../../const/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public fullName = '';
  public email = '';
  public password = '';
  errorMessage = '';
  err = false;
  loadSpin = true;
  @ViewChild('closeModal') private closeModal: ElementRef;

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  get isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0 && this.fullName.length > 0;
  }

  ngOnInit(): void {
  }

  register() {
    console.log('User details: ', this.fullName + ' ' + this.email + ' ' + this.password);
    this.authService.emailSignUp(this.email, this.password, this.fullName, 'admin')
      .then((res) => {
        this.localStorageService.saveAdmin(res);
        this.loadSpin = false;
        this.hideModel();
        this.router.navigate(['/admin']);
      }).catch((err) => {
        this.err = true;
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = CommonMessages['auth/email-already-in-use'];
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = CommonMessages['auth/invalid-email'];
        }
        else if (err.code === 'auth/weak-password') {
          this.errorMessage = err.message;
        }      // do nothing
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  resetPassword() {
    this.router.navigate(['/reset-password']);
  }

  public hideModel() {
    this.closeModal.nativeElement.click();
  }

}
