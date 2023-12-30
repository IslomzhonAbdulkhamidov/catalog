import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-admin-route',
  templateUrl: './admin-route.component.html',
  styleUrls: ['./admin-route.component.scss']
})
export class AdminRouteComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Toggle Category Menu
    $('.catmenu-trigger').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('is-active');
      $(this).siblings('.catmenu-body').slideToggle();
    });
    $('.catmenu-trigger.is-active').siblings('.catmenu-body').slideDown();

    // Category Menu More
    $('.catmenu-moretrigger a').on('click', function (e) {
      e.preventDefault();
      $(this).parents('.catmenu').find('.catmenu-hidden').slideToggle();
    });
  }

  signOut(){
    this.authService.signOut();
    this.localStorageService.deleteAdmin();
    this.router.navigate(['/main']);
  }

}
