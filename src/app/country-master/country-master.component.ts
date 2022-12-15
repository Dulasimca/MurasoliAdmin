import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss']
})
export class CountryMasterComponent implements OnInit {

  countryName: any;
  selectedType: any;
  countryId: any;
  countryNameTamil: any;
  Countrydata: any[] = [];

  constructor(private restApiService: RestAPIService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
    this.countryId = 0;
  }

  onSave() {
    //update
    if (this.countryId !== 0) {
      const values = {
        'u_countrycode': this.countryId,
        'u_countrynametamil': this.countryNameTamil,
        'u_countryname': this.countryName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.UpdateCountryMaster_Update, values).subscribe(res => {
        if (res) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
          });
          this.onView();
          this.Clear();
        }
      })
    }
    else {
      //save
      const params = {
        'countrycode': this.countryId,
        'countryname': this.countryName,
        'countrynametamil': this.countryNameTamil,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.CountryMaster_Post, params).subscribe((res: any) => {
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
    }
  }

  onEdit(rowData: any) {
    this.countryId = rowData.g_countryid,
      this.countryName = rowData.g_countryname,
      this.countryNameTamil = rowData.g_countrynametamil,
      this.selectedType = rowData.g_flag;
  }

  onView() {
    this.restApiService.get(PathConstants.CountryMaster_Get).subscribe(res => {
      res.Table.forEach((i: any) => {
        i.flagstatus = (i.g_flag === true) ? 'Active' : 'Inactive'
      })
      this.Countrydata = res.Table;
    })
  }
  Clear() {
    this.countryName = null;
    this.countryNameTamil = null;

  }



}
