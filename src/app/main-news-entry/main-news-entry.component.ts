import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-main-news-entry',
  templateUrl: './main-news-entry.component.html',
  styleUrls: ['./main-news-entry.component.scss']
})
export class MainNewsEntryComponent implements OnInit {

  newsTitle: any;
  newsTitleOptions: SelectItem[] = [];
  filename: any;
  newsDetail: string = '';
  locationOptions: SelectItem[] = [];
  location: any;
  priorityOptions: SelectItem[] = [];
  priority: any;
  districtOptions: SelectItem[] = [];
  district: any;
  stateOptions: SelectItem[] = [];
  state: any;
  countryOptions: SelectItem[] = [];
  country: any;
  displayOptions: SelectItem[] = [];
  display: any;
  newsTamilTitle: any;
  newsTamilDetail: any;
  districts: any;
  states: any;
  countries: any;
  constructor(private restApiService: RestAPIService) { }

  ngOnInit(): void {
    this.getMasterData();
  }

  getMasterData() {
    this.restApiService.get(PathConstants.DistrictMaster_Get).subscribe(res => {
      this.districts = res.Table
    })
    this.restApiService.get(PathConstants.CountryMaster_Get).subscribe(res => {
      this.countries = res.Table;
    })
    this.restApiService.get(PathConstants.StateMaster_Get).subscribe(res => {
      this.states = res.Table;
    })
  }


  onSelect(value: any) {
    let districtSelection: any = [];
    let stateSelection: any = [];
    let countrySelection: any = [];
    switch (value) {
      case 'D':
        this.districts.forEach((d:any) => {
          districtSelection.push({ label: d.districtname, value: d.districtcode });
        })
        this.districtOptions = districtSelection;
        this.districtOptions.unshift({ label: '-select-', value: null });
        break;
      case 'S':
        this.states.forEach((s:any) => {
          stateSelection.push({ label: s.statename, value: s.statecode });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.countries.forEach((c:any) => {
          countrySelection.push({ label: c.countryname, value: c.countrycode });
        })
        this.countryOptions = countrySelection;
        this.countryOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }

  onSave() {

  // this.restApiService.post(PathConstants.ma)
   }

}
