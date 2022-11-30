import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-daily-newspaper-upload',
  templateUrl: './daily-newspaper-upload.component.html',
  styleUrls: ['./daily-newspaper-upload.component.scss']
})
export class DailyNewspaperUploadComponent implements OnInit {

  date: any;
  NewsData: any[] = [];
  public formData = new FormData();
  FileName: any;
  slNo: any;
  districts?: any;
  districtOptions: SelectItem[] = [];
  district: any;
  @ViewChild('fileSelector', { static: false }) fileSelector!: ElementRef;


  constructor(private http: HttpClient, private restApiService: RestAPIService, private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
    this.slNo = 0;
    this.restApiService.get(PathConstants.DistrictMaster_Get).subscribe(res => {
      this.districts = res.Table
    })
  }


  public uploadFile = (event: any) => {
    this.formData = new FormData()
    let fileToUpload: any = <File>event.target.files[0];
    const folderName = 'Newspapers';
    const uploadedFilename = (fileToUpload.name).toString();
    const extension = uploadedFilename.substring(uploadedFilename.lastIndexOf('.') + 1, uploadedFilename.length);
    var filenameWithExtn = extension;
    const filename = fileToUpload.name + '^' + folderName + '^' + filenameWithExtn;
    this.formData.append('file', fileToUpload, filename);
    this.FileName = fileToUpload.name;
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => {
      }
      );
    return filenameWithExtn;
  }

  onSelect(value: any) {
    let districtSelection: any = [];
    switch (value) {
      case 'D':
        this.districts.forEach((d:any) => {
          districtSelection.push({ label: d.g_districtname, value: d.g_districtid });
        })
        this.districtOptions = districtSelection;
        // this.districtOptions.unshift({ label: '-select-', value: null });
        break;
      }
    }


  onSave() {
    const params = {
      'id': this.slNo,
      'dsitrict': this.district,
      'newspaperdate': this.date,
      'filename': this.FileName,
      'flag': true
    }
    this.restApiService.post(PathConstants.DailyNewsPaper_Post, params).subscribe(res => {
      if(res) {
        this.onView();
      this.Clear();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
          });
        }else {
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

  onView() {
    this.restApiService.get(PathConstants.DailyNewsPaper_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i:any) => {
           i.newspaperdate = this.datePipe.transform(i.newspaperdate,'dd-MM-yyyy')
            console.log('1',this.date)
          })
          this.NewsData = res.Table
        }
      }
    })
  }

  Clear() {
    this.date = null;
    this.fileSelector.nativeElement.value = null;
  }

  onEdit(rowData: any) {
    this.slNo = rowData.g_id,
    this.date = new Date(rowData.g_newspaperdate)
  }
}
