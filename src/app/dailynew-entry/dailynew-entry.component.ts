import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';
import { ResponseMessage } from '../Common-Modules/messages';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { InputText } from 'primeng/inputtext';
import { NgForm } from '@angular/forms';

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
  Id: any;
  dailyNewsdata: any[] = [];
  public formData = new FormData();
  FileName: any;
  districts: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  showDialog: boolean = false;
  NewsImage: string = '';
  showTable: boolean = false;

  // @ViewChild('file', { static: false }) _input: InputText;


  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private http: HttpClient, private _d: DomSanitizer) { }

  ngOnInit(): void {
    this.Id = 0;
    this.getMasterData();
    this.priorityOptions = [
      { label: 'Low', value: 0 },
      { label: 'Meduim', value: 1 },
      { label: 'High', value: 2 }
    ];
    this.displayOptions = [
      // {label: '-Select', value: null},
      { label: 'Left', value: 0 },
      { label: 'Right', value: 1 },
      { label: 'Center', value: 2 }
    ]
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
        this.districts.forEach(g => {
          districtSelection.push({ label: g.districtname, value: g.districtcode });
        })
        this.districtOptions = districtSelection;
        // this.districtOptions.unshift({ label: '-select-', value: null });
        break;
      case 'S':
        this.states.forEach(g => {
          stateSelection.push({ label: g.statename, value: g.statecode });
        })
        this.stateOptions = stateSelection;
        // this.stateOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.countries.forEach(g => {
          countrySelection.push({ label: g.countryname, value: g.countrycode });
        })
        this.countryOptions = countrySelection;
        // this.countryOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }
  public uploadFile = (event: any) => {
    // const selectedFile = event.target.files[0];
    // {
    //   const url = window.URL.createObjectURL(selectedFile);
    //   this.filename = this._d.bypassSecurityTrustUrl(url);
    // }
    this.formData = new FormData()
    let fileToUpload: any = <File>event.target.files[0];
    const folderName = 'Documents';
    console.log('d', folderName)
    // var curr_datetime = this._datePipe.transform(new Date(), 'ddMMyyyyhmmss');
    const uploadedFilename = (fileToUpload.name).toString();
    const extension = uploadedFilename.substring(uploadedFilename.lastIndexOf('.') + 1, uploadedFilename.length);
    var filenameWithExtn = extension;
    const filename = fileToUpload.name + '^' + folderName + '^' + filenameWithExtn;
    this.formData.append('file', fileToUpload, filename);
    this.FileName = fileToUpload.name;
    console.log('t', filename)
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => {
      }
      );
    return filenameWithExtn;
  }


  showImage(url: any) {
    this.showDialog = true;
    this.NewsImage = url;
  }



  onSave() {
    console.log('d', this.Id)
    if (this.Id === 0) {
      const params = {
        'slno': this.Id,
        'newstitle': this.newsTitle,
        'details': this.newsDetail,
        'image': this.FileName,
        'location': this.location,
        'district': this.district,
        'state': this.state,
        'country': this.country,
        'displayside': this.display,
        'priority': this.priority,
        'flag': true
      }
      this.restApiService.post(PathConstants.DailyNewsEntry_Post, params).subscribe((res: any) => {
        if (res) {
          this.onView();
          this.clear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
    }
    else {
      const params = {
        'u_slno': this.Id,
        'u_newstitle': this.newsTitle,
        'u_details': this.newsDetail,
        'u_image': this.FileName,
        'u_location': this.location,
        'u_district': this.district,
        'u_state': this.state,
        'u_country': this.country,
        'u_displayside': this.display,
        'u_priority': this.priority,
        'u_flag': true

      }
      this.restApiService.post(PathConstants.UpdateDailyNewsEntry_Update, params).subscribe(res => {
        if (res) {
          this.onView();
          this.clear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
          });
        }
      })
    }
  }
  onView() {
    this.showTable = true;
    this.restApiService.get(PathConstants.DailyNewsEntry_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i: any) => {
            i.url = 'assets/layout/Documents/' + i.image;
          }),
            this.dailyNewsdata = res.Table;

        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      }
    })
  }


  // translate(value: number) {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  //   });
  //   const data = {
  //     'topic': 'God is Great',
  //     'detail': 'Successful',
  //     'lang': 0
  //   };
  //   this.http.post('http://192.168.1.11:5000/translate', data, {headers}).subscribe((response: any) => {
  //     console.log('res',response)

  //   })
  // }

  onEdit(rowData: any) {
    this.Id = rowData.slno,
      this.newsTitle = rowData.newstitle,
      this.newsDetail = rowData.details,
      this.priority = rowData.priority,
      this.display = rowData.displayside,
      this.location = rowData.location,
      this.district = rowData.district,
      this.state = rowData.state,
      this.country = rowData.country,
      // this.FileName = rowData.image;
      // this._input.el.nativeElement = this.FileName;
      // this.FileName = 'assets/layout/Documents/' + rowData.image;
      console.log('d', this.FileName)
  }

  clear() {
    this.Id = 0;
    this.newsDetail = '';
    this.newsTitle = null;
    this.displayOptions = [];
    this.priorityOptions = [];
    this.districtOptions = [];
    this.stateOptions = [];
    this.countryOptions = [];
    this.location = null;
    this.filename = ''
    // this._dailynewsform.reset();
  }
}
