import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
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
  newsTamilDetail: any = '';
  districts: any;
  states: any;
  countries: any;
  mainNewsdata: any[] = [];
  FileName: any;
  showDialog: boolean = false;
  NewsImage: any;
  Id: number = 0;
  showTable: boolean = false;
  incidentDate: any;
  newsTamilShort: string = '';
  newsShort: string = '';
  public formData = new FormData();
  @ViewChild('fileSelector', { static: false }) fileSelector!: ElementRef;
  @ViewChild('f', { static: false }) mainNewsForm!: NgForm;
  editor: any = Editor ;
  htmlnewsContent = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private http: HttpClient, private _d: DomSanitizer, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getMasterData();
    this.editor = new Editor();
  }
  
  ngOnDestroy(): void {
    this.editor.destroy();
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
      case 'DP':
        this.displayOptions = [
          { label: 'Left', value: 0 },
          { label: 'Right', value: 1 },
          { label: 'Center', value: 2 },
          { label: 'Bottom', value: 3 }
        ]
        break;
      case 'P':
        this.priorityOptions = [
          { label: 'Low', value: 0 },
          { label: 'Meduim', value: 1 },
          { label: 'High', value: 2 }
        ];
        break;
      case 'D':
        this.districts.forEach((d: any) => {
          districtSelection.push({ label: d.g_districtname, value: d.g_districtid });
        })
        this.districtOptions = districtSelection;
        // this.districtOptions.unshift({ label: '-select-', value: null });
        break;
      case 'S':
        this.states.forEach((s: any) => {
          stateSelection.push({ label: s.g_statename, value: s.g_stateid });
        })
        this.stateOptions = stateSelection;
        // this.stateOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.countries.forEach((c: any) => {
          countrySelection.push({ label: c.g_countryname, value: c.g_countryid });
        })
        this.countryOptions = countrySelection;
        // this.countryOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }

  //fileupload
  public uploadFile = (event: any) => {
    this.formData = new FormData();
    let fileToUpload: any = <File>event.target.files[0];
    const uploadedFilename = (fileToUpload.name).toString();
    const extension = uploadedFilename.substring(uploadedFilename.lastIndexOf('.') + 1, uploadedFilename.length);
    console.log('etx', extension)
    if(extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
    const folderName = 'Documents';
    const filename = fileToUpload.name + '^' + folderName + '^' + extension;
    this.formData.append('file', fileToUpload, filename);
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe((event: any) => {
        this.FileName = event.item2;
      });
    } else {
      this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ImageFormatErr
          })
    }
  }

  showImage(url: any) {
    this.showDialog = true;
    this.NewsImage = url;
  }

  onSave() {
    //post
    if (this.Id === 0) {
      const params = {
        'slno': this.Id,
        'newstitle': '',
        'newstitletamil': this.newsTamilTitle,
        'newsdetailstamil': this.newsTamilDetail,
        'details': '',
        'image': this.FileName,
        'location': this.location,
        'district': this.district,
        'state': this.state,
        'country': this.country,
        'displayside': this.display,
        'priority': this.priority,
        'incidentdate': this.incidentDate,
        'newsshort': '',
        'newsshorttamil': this.newsTamilShort,
        'flag': true
      }
      this.restApiService.post(PathConstants.MainNewsEntry_Post, params).subscribe((res: any) => {
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
    } //update
    else {
      const params = {
        'u_slno': this.Id,
        'u_newstitle': '',
        'u_newstitletamil': this.newsTamilTitle,
        'u_newsdetailstamil': this.newsTamilDetail,
        'u_details': '',
        'u_image': this.FileName,
        'u_location': this.location,
        'u_district': this.district,
        'u_state': this.state,
        'u_country': this.country,
        'u_displayside': this.display,
        'u_priority': this.priority,
        'u_incidentdate': this.incidentDate,
        'u_newsshort': '',
        'u_newstamilshort': this.newsTamilShort,
        'u_flag': true
      }

      this.restApiService.post(PathConstants.MainNewsEntry_Update, params).subscribe(res => {
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
    console.log('q',this.newsTamilDetail)
    this.showTable = true;
    this.restApiService.get(PathConstants.MainNewsEntry_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i: any) => {
            i.idate = this.datePipe.transform(i.g_incidentdate, 'dd-MM-yyyy, h:mm a')
            i.url = 'assets/layout/Documents/' + i.g_image;
            i.g_priorityname = (i.g_priority === 0) ? 'Low' : (i.g_priority === 1) ? 'Medium' :   'High';
            i.g_displaysidename = (i.g_displayside === 0) ? 'Left' : (i.g_displayside === 1) ? 'Right' : (i.g_displayside === 2) ? 'Center' :  'Bottom';
          }),
            this.mainNewsdata = res.Table;
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

  onEdit(rowData: any) {
    this.Id = rowData.g_slno;
    this.incidentDate = new Date(rowData.g_incidentdate);
    this.newsTitle = rowData.g_newstitle;
    this.newsTamilTitle = rowData.g_newstitletamil;
    this.newsDetail = rowData.g_details;
    this.newsTamilDetail = rowData.g_newsdetailstamil;
    this.newsShort = rowData.g_newsshort;
    this.newsTamilShort = rowData.g_newsshorttamil;
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
  }

  clear() {
    this.fileSelector.nativeElement.value = null;
    this.mainNewsForm.reset();
  }

//   validateFileType(){
//     var fileName = document.getElementById("file").val;
//     var idxDot = fileName.lastIndexOf(".") + 1;
//     var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
//     if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
//         //TO DO
//     }else{
//         alert("Only jpg/jpeg and png files are allowed!");
//     }   
// }
}

