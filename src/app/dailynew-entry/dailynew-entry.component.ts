import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSave() { }

  translate(value: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
    const data = {
      'topic': 'God is Great',
      'detail': 'Successful',
      'lang': 0
    };
    this.http.post('http://192.168.1.11:5000/translate', data, {headers}).subscribe((response: any) => {
      console.log('res',response)
            
    })
  }

}
