import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hidebutton: boolean = true;
  @ViewChild('op', { static: false }) _op!: OverlayPanel;
  username: any;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.checkCurrentPage();
  }

  checkCurrentPage() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login-page' || event.url === '/') {
          this.hidebutton = true;
        } else {
          this.hidebutton = false;
        }
      }
    });
  }

  logout() {
    this.route.navigate(['/login-page'])
  }
}
