import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  selectedType: any;
  userdata: any[] = [];
  roleid: any;
  id: any;
  
  constructor(private restapiService: RestAPIService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.id = 0;
    this.onView();
  }

  onSave() {
    if (this.id !== 0) {
      const values = {
        'u_id': this.id,
        'u_username': this.username,
        'u_emailid': this.email,
        'u_password': this.password,
        'u_roleid': 1,
        'flag': (this.selectedType == 1) ? true : false
      }
      this.restapiService.post(PathConstants.UpdateUsers_Update, values).subscribe(res => {
        if (res) {
          this.onView();
        }
      })
    } else {
    const params = {
      'id': this.id,
      'username': this.username,
      'emailid': this.email,
      'password': this.password,
      'roleid': 1,
      'Flag':  (this.selectedType == 1) ? true : false
    }
    this.restapiService.post(PathConstants.Users_Post, params).subscribe(res => {
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
    this.id = rowData.g_id;
    this.username = rowData.g_username;
    this.email = rowData.g_emailid;
    this.password = rowData.g_password;
    this.roleid = rowData.g_roleid;
    this.selectedType = (rowData.g_flag === 'Active') ? 1 : 0;
  }

  onView() {
    this.restapiService.get(PathConstants.Users_Get).subscribe(res => {
      if(res !== null && res !== undefined) {
        if(res.Table.length !== 0 ) {
          res.Table.forEach((i: any) => {
           i.g_flag = (i.g_flag === true) ? 'Active' : 'Inactive'
          })
          this.userdata = res.Table;
        } else{
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          })
        }
      }
    })
  }

  onClear() {
    this.username = null;
    this.email = null;
    this.password = null;
    
  }

   //checking existing mailid
   emailValidationCheck() {
    if (this.email !== undefined && this.email !== null && this.email.trim() !== '') {
      const entered_email: string = this.email.trim();
      const substr = entered_email.split('@');
      if (substr !== undefined && substr.length > 1) {
        const last_str = substr[1].split('.');
        if (last_str !== undefined && last_str.length > 1) {
          if (last_str[1].toLowerCase() === 'com' || last_str[1].toLowerCase() === 'in') {
          } else {
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
              summary: ResponseMessage.SUMMARY_WARNING, detail: 'Enter valid email address'
            })    
          }
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: 'Enter valid email address'
          })      
        }
      }else {
        this.email = null;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: 'Enter valid email address'
        })    
      }
    }
  }
}
