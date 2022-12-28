import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Modules/messages';
import { PathConstants } from 'src/app/Common-Modules/Pathconstants';
import { RestAPIService } from 'src/app/Services/restApi.service';

@Component({
  selector: 'app-reporterreg-approval',
  templateUrl: './reporterreg-approval.component.html',
  styleUrls: ['./reporterreg-approval.component.scss']
})
export class ReporterregApprovalComponent implements OnInit {

  reporterData: any[] = [];
  Id: any;
  approvalStatus: any;
  tEnableTick: boolean = false;
  tCrossTick: boolean = false;
  disableApprove: boolean = false;
  disableReject: boolean = false;
  showDialog: boolean = false;
  
  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,  private messageService: MessageService, private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.onView();
  }

  onView() {
    this.restApiService.get(PathConstants.ReporterRegistration_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i: any) => {
            i.g_date = this.datePipe.transform(i.g_dob, 'dd-MM-yyyy, h:mm a')
            i.g_genderName = (i.g_gender === 1) ? 'Male' : (i.g_gender === 2) ? 'Female' : 'Transgender';
            i.disableApprove = (i.g_approvalstatus === 2) ? true : false;
            i.tEnableTick =  (i.g_approvalstatus === 1) ? true : false;
            i.disableReject = (i.g_approvalstatus !== 2) ? true : false;
            i.tCrossTick =  (i.g_approvalstatus === 2) ? true : false;
          })
          this.reporterData = res.Table
        }  else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }     
      }
    })
  }

  selectForApproval(row: any) {
    if(row !== null && row !== undefined) {
      const params = {
        'u_slno': row.g_slno,
        'u_approvalstatus': 1
      }
      this.restApiService.post(PathConstants.UpdateReporterRegBySlno_Update, params).subscribe(res => {
        if (res) {
          this.disableApprove = false;
          this.tEnableTick = true;
          this.onSave(row);
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
            summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
          });
        }
      })
    }
  }

  selectForDisApproval(row: any) {    
    if(row !== null && row !== undefined) {
      this._confirmationService.confirm({
        message: 'Do You Want To Reject?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const params = {
            'u_slno': row.g_slno,
            'u_approvalstatus': 2
          }
          this.restApiService.post(PathConstants.UpdateReporterRegBySlno_Update, params).subscribe(res => {
            if (res) {
              this.disableReject = false;
              this.tCrossTick = true;
              this.disableApprove = false;
              this.onView();
              this.messageService.clear();
              this.messageService.add({
                key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
                summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.UpdateMsg
              });
            }
          })
        },
        reject: () => {
        
        }
      });
    }
  }

  onSave(row:any) {
    const params = {
      'id': 0,
      'username': row.g_name,
      'emailid': row.g_mailid,
      'password': 'Murasoli@123',
      'roleid': 4,
      'Flag':  true
    }
    this.restApiService.post(PathConstants.Users_Post, params).subscribe(res => {
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
