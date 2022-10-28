import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  titles: any[] = [];
  @Input() hide: boolean = false;

  constructor() { }
    ngOnInit() {
      this.items = [
        {label: 'Call Sheet', icon: 'pi pi-fw pi-book', id: '1', routerLink: '/call-sheet'},
        {label: 'Shooting Schedule', icon: 'pi pi-fw pi-clock', id: '1', routerLink: '/shooting-schedule'},
      ]
        
    }
}
