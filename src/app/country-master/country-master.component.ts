import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss']
})
export class CountryMasterComponent implements OnInit {

  countryName: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {

  }

}
