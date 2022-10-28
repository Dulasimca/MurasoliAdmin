import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  display: boolean = false;
  @Output() openMenu = new EventEmitter<boolean>();
  @Input() hide: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(value: boolean) {
    this.display = !this.display;
    this.openMenu.emit(value);
    console.log('val', value, this.display)
  }


}
