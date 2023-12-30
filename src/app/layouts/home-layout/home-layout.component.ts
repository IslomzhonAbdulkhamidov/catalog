import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  title = 'Katalog';
  location: any;
  routerSubscription: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recallJsFuntions();
  }

  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        if (this.location.substr(0, 14) == '/phone-detail/') {
          if (this.location.indexOf('?') === -1) {
            window.scrollTo(0, 0);
          }
        } else {
          window.scrollTo(0, 0);
        }
        // window.scrollTo(0, 0);
      });
  }
}
