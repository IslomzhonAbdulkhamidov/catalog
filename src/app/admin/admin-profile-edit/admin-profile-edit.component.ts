import { AdminService } from './../../auth/admin.service';
import { User } from './../../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.scss']
})
export class AdminProfileEditComponent implements OnInit {
  id = '';
  admin: User;

  constructor(
    private localStorageService: LocalStorageService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.admin = this.localStorageService.getAdmin();
  }

  updateAdminInfo() {
    this.adminService.update(this.admin.uid, this.admin).then(res => {
      console.log('updated');
    });
  }

}
