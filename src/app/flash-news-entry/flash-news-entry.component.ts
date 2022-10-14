import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-flash-news-entry',
  templateUrl: './flash-news-entry.component.html',
  styleUrls: ['./flash-news-entry.component.scss']
})
export class FlashNewsEntryComponent implements OnInit {

  location: any;
  locationOptions: SelectItem[] = [];
  newsTamilDetail: any;
  newsDetail: any;
  date: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {

  }
}
