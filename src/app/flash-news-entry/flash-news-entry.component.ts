import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

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
  Id: number = 0;
  flashNewsData: any[] = [];

  constructor(private restApiService: RestAPIService, private messageService: MessageService, private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  onSave() {
    if (this.Id === 0) {
      const params = {
        'slno': this.Id,
        'location': this.location,
        'incidentdate': this.date,
        'newsdetails': this.newsDetail,
        'newsdetailstamil': this.newsTamilDetail,
        'flag': true
      }
      this.restApiService.post(PathConstants.FlashNewsEntry_Post, params).subscribe(res => {
        if (res) {
          this.onView();
          this.Clear();
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
    } else {
      const params = {
        'u_slno': this.Id,
        'u_location': this.location,
        'u_incidentdate': this._datePipe.transform(this.date, 'MM-dd-yyyy'),
        'u_newsdetails': this.newsDetail,
        'u_newsdetailstamil': this.newsTamilDetail,
        'u_flag': true
      }
      this.restApiService.post(PathConstants.FlashNewsEntry_Update, params).subscribe(res => {
        if (res) {
          this.onView();
          this.Clear();
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
    this.messageService.clear();
    this.messageService.add({
      key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
      summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
    });
    this.restApiService.get(PathConstants.FlashNewsEntry_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          this.flashNewsData = res.Table;
          res.Table.forEach((i: any) => {
            i.idate = this._datePipe.transform(i.g_incidentdate, 'dd-MM-yyyy')
          })
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    })
  }

  onEdit(rowData: any) {
    this.Id = rowData.g_slno;
    this.date = new Date(rowData.g_incidentdate);
    this.location = rowData.g_location;
    this.newsDetail = rowData.g_newsdetails;
    this.newsTamilDetail = rowData.g_newsdetailstamil;
  }

  Clear() {
    this.location = null;
    this.newsDetail = null;
    this.Id = 0;
    this.date = null;
    this.newsTamilDetail = null;
  }

}
