import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.email.length > 0;
  }

  resetPassword() {
    this.authService.resetPassword(this.email);
  }

}
