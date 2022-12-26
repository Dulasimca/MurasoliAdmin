import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MURASOLI-ADMIN';
  showMenu: boolean = true;
  hideMenu: boolean = false;
  styleOne: boolean = false;

constructor(private _router: Router) {
  this._router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/login-page' || event.url === '/') {
        this.hideMenu = false;
        this.styleOne = false;
      } else {
        this.hideMenu = true;
        this.styleOne = true;
      }
    }
  });
}
}

 

 

