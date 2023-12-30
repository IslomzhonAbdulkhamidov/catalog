import { Component } from '@angular/core';
import {
  Router,
  NavigationCancel,
  NavigationEnd,
} from '@angular/router';
import { filter} from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Katalog';
  location: any;
  routerSubscription: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.recallJsFuntions()  
  }

  recallJsFuntions() {

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe((event) => {

        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        if(this.location.substr(0,14) == '/phone-detail/') {
          if(this.location.indexOf('?') === -1) {
            window.scrollTo(0, 0)
          } 
           }

        else{
          window.scrollTo(0,0)
        }
        // window.scrollTo(0, 0);
      });
  }
}
