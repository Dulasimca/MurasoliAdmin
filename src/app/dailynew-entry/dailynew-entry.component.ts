import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';
import { ResponseMessage } from '../Common-Modules/messages';
import { DomSanitizer } from '@angular/platform-browser';
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
  fileName: any;
  districts: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  showDialog: boolean = false;
  NewsImage: string = '';
  showTable: boolean = false;
  @ViewChild('fileSelector', { static: false }) fileSelector!: ElementRef;
  @ViewChild('f', { static: false }) dailynewsForm!: NgForm;
  // @ViewChild('fileselector', { static: false }) uploadfilename!: ElementRef;


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
          districtSelection.push({ label: g.g_districtname, value: g.g_districtid });
        })
        this.districtOptions = districtSelection;
        // this.districtOptions.unshift({ label: '-select-', value: null });
        break;
      case 'S':
        this.states.forEach(g => {
          stateSelection.push({ label: g.g_statename, value: g.g_stateid });
        })
        this.stateOptions = stateSelection;
        // this.stateOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.countries.forEach(g => {
          countrySelection.push({ label: g.g_countryname, value: g.g_countryid });
        })
        this.countryOptions = countrySelection;
        // this.countryOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }
  public uploadFile = (event: any) => {
    this.formData = new FormData()
    let fileToUpload: any = <File>event.target.files[0];
    const folderName = 'Documents';
    const uploadedFilename = (fileToUpload.name).toString();
    const extension = uploadedFilename.substring(uploadedFilename.lastIndexOf('.') + 1, uploadedFilename.length);
    var filenameWithExtn = extension;
    const filename = fileToUpload.name + '^' + folderName + '^' + filenameWithExtn;
    this.formData.append('file', fileToUpload, filename);
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
        this.fileName = event.item2;
      }
      );
    return filenameWithExtn;
  }

  showImage(url: any) {
    this.showDialog = true;
    this.NewsImage = url;
  }

  onSave() {
    if (this.Id === 0) {
      const params = {
        'slno': this.Id,
        'newstitle': this.newsTitle,
        'newstitletamil': this.newsTamilTitle,
        'newsdetailstamil': this.newsTamilDetail,
        'details': this.newsDetail,
        'image': this.fileName,
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
        'u_newstitletamil': this.newsTamilTitle,
        'u_newsdetailstamil': this.newsTamilDetail,
        'u_details': this.newsDetail,
        'u_image': this.fileName,
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
            i.url = 'assets/layout/Documents/' + i.g_image;
            i.g_priorityname = (i.g_priority === 0) ? 'Low' : (i.g_priority === 1) ? 'Medium' : (i.g_priority === 2) ? 'High' : '-';
            i.g_displaysidename = (i.g_displayside === 0) ? 'Left' : (i.g_displayside === 1) ? 'Right' : (i.g_displayside === 2) ? 'Center' : '-';
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
    this.Id = rowData.g_slno;
    this.newsTitle = rowData.g_newstitle;
    this.newsDetail = rowData.g_details;
    this.newsTamilTitle = rowData.g_newstitletamil;
    this.newsTamilDetail = rowData.g_newsdetailstamil;
    this.priority = rowData.g_priority;
    this.priorityOptions = [{ label: rowData.g_priorityname, value: rowData.g_priority }];
    this.display = rowData.g_displayside;
    this.displayOptions = [{ label: rowData.g_displaysidename, value: rowData.g_displayside }];
    this.location = rowData.g_location;
    this.district = rowData.g_district;
    this.districtOptions = [{ label: rowData.g_districtname, value: rowData.g_district }];
    this.state = rowData.g_state;
    this.stateOptions = [{ label: rowData.g_statename, value: rowData.g_state }];
    this.country = rowData.g_country;
    this.countryOptions = [{ label: rowData.g_countryname, value: rowData.g_country }];
    this.fileName = rowData.g_image;
  }

  clear() {
    this.Id = 0;
    this.fileSelector.nativeElement.value = null;
    this.dailynewsForm.reset();
  }
}
