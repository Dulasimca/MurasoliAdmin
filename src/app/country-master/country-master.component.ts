import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  Countrydata: any[] = [];
  messageService: any;

  constructor(private restApiService: RestAPIService) { }

  ngOnInit(): void {
    this.onView();
    this.countryId = 0;
  }

  onSave() {
    //update
    if (this.countryId !== 0) {
      const values = {
        'u_countrycode': this.countryId,
        // 'u_districtid': this.districtId,
        'u_countryname': this.countryName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.UpdateCountryMaster_Update, values).subscribe(res => {
        if(res) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
          });
          this.onView();
          this.clear();
        }
      })
    }
    else {
      //save
      const params = {
        'countrycode': this.countryId,
        'countryname': this.countryName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.CountryMaster_Post, params).subscribe((res: any) => {
        if(res) {
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
  }

  onEdit(rowData: any) {
    this.countryId = rowData.countrycode,
      this.countryName = rowData.countryname,
      this.selectedType = rowData.flag
  }

  onView() {
    this.restApiService.get(PathConstants.CountryMaster_Get).subscribe(res => {
      this.Countrydata = res.Table;
    })
  }
 clear() {
  this.countryName = null;
  this.selectedType = null;

 }
   


}
