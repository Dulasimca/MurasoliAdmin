import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-state-master-entry',
  templateUrl: './state-master-entry.component.html',
  styleUrls: ['./state-master-entry.component.scss']
})
export class StateMasterEntryComponent implements OnInit {

  stateName: any;
  selectedType: any;
  Id: number = 0;
  Statedata: any[] = [];

  constructor(private restApiService: RestAPIService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
  }

  onSave() {
    //update
    if (this.Id !== 0) {
      const values = {
        'u_statecode': this.Id,
        // 'u_districtid': this.districtId,
        'u_statename': this.stateName,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.UpdateStateMaster_Update, values).subscribe(res => {
        if (res) {
          this.onView();
          this.clear();
        }
      })
    }
    else {
      //save
      const params = {
        'statecode': this.Id,
        'statename': this.stateName,
        'Flag': (this.selectedType == 1) ? true : false
      }
      this.restApiService.post(PathConstants.StateMaster_Post, params).subscribe((res: any) => {
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
  }

  onEdit(rowData: any) {
    this.Id = rowData.statecode,
      this.stateName = rowData.statename,
      this.selectedType = rowData.flag
  }

  onView() {
    this.restApiService.get(PathConstants.StateMaster_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          this.Statedata = res.Table;
        } else {
          this.Statedata = [];
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

  clear() {
    this.stateName = null;
    this.selectedType = null;
  }

}


