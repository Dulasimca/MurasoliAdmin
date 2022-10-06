import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-dailynew-entry',
  templateUrl: './dailynew-entry.component.html',
  styleUrls: ['./dailynew-entry.component.scss']
})
export class DailynewEntryComponent implements OnInit {
  newsTitle: any;
  newsTitleOptions: SelectItem[] = [];
  filename: any;
  newsDetail: string = '';
  locationOptions: SelectItem[] = [];
  location: any;
  priorityOptions: SelectItem[] = [];
  priority: any;
  districtOptions:SelectItem[] =[];
  district: any;
  stateOptions: SelectItem[] = [];
  state: any;
  countryOptions: SelectItem[] = [];
  country: any;
  displayOptions: SelectItem[] = [];
  display: any;
  constructor() { }

  ngOnInit(): void {
  }

  onSave() { }

}
