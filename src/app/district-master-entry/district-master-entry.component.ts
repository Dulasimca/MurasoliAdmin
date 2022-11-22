import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Modules/Pathconstants';
import { ResponseMessage } from '../Common-Modules/messages';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-district-master-entry',
  templateUrl: './district-master-entry.component.html',
  styleUrls: ['./district-master-entry.component.scss']
})
export class DistrictMasterEntryComponent implements OnInit {

  districtName: any;
  selectedType: any;
  districtId: any;
  Districtdata: any[] = [];

  constructor(private restApiService: RestAPIService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.districtId = 0;
    this.onView();
  }

  onSave() {
    //update
    if (this.districtId !== 0) {
      const values = {
        'u_districtcode': this.districtId,
        // 'u_districtid': this.districtId,
        'u_districtname': this.districtName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.DistrictMaster_Update, values).subscribe(res => {
        if (res) {
          this.onView();
        }
      })
    }
    else {
      //save
      const params = {
        'districtcode': this.districtId,
        'districtname': this.districtName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.DistrictMaster_Post, params).subscribe((res: any) => {
        if (res) {
          this.onView();
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
    this.districtId = rowData.g_districtid,
      this.districtName = rowData.g_districtname,
      this.selectedType = (rowData.g_flag === 'Active') ? 1 : 0;

  }

  onView() {
    this.restApiService.get(PathConstants.DistrictMaster_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i: any) => {
            i.flag = (i.flag === true) ? 'Active' : 'Inactive'
          })
          this.Districtdata = res.Table;
        } else {
          this.Districtdata = [];
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      } else {

      }
    })
  }

}
