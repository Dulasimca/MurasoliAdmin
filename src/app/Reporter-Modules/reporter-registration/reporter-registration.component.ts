import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Modules/messages';
import { PathConstants } from 'src/app/Common-Modules/Pathconstants';
import { RestAPIService } from 'src/app/Services/restApi.service';

@Component({
  selector: 'app-reporter-registration',
  templateUrl: './reporter-registration.component.html',
  styleUrls: ['./reporter-registration.component.scss']
})
export class ReporterRegistrationComponent implements OnInit {

  name: any;
  mailId: any;
  address: any;
  state: any;
  stateOptions: SelectItem[] = [];
  district: any;
  districtOptions: SelectItem[] = [];
  city: any;
  landMark: any;
  pinCode:any;
  dob: any;
  gender: any;
  genderOptions: SelectItem[] = [];
  phnNum: any;
  reporterData: any[] = [];
  districts?: any;
  states?: any;
  Id: number = 0;

  // @ViewChild('f', { static: false }) reporterRegForm!: NgForm;


  constructor(private restApiService: RestAPIService, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getMasterData();
    this.onView();
  }

  getMasterData() {
    this.restApiService.get(PathConstants.DistrictMaster_Get).subscribe(res => {
      this.districts = res.Table
    })
    this.restApiService.get(PathConstants.StateMaster_Get).subscribe(res => {
      this.states = res.Table;
    })
  }

  onSelect(value: any) {
    let districtSelection: any = [];
    let stateSelection: any = [];
    switch (value) {
      case 'D':
        this.districts.forEach((d: any) => {
          districtSelection.push({ label: d.g_districtname, value: d.g_districtid });
        })
        this.districtOptions = districtSelection;
        //this.districtOptions.unshift({ label: '-select-', value: null });
        break;
        case 'S':
        this.states.forEach((g: any) => {
          stateSelection.push({ label: g.g_statename, value: g.g_stateid });
        })
        this.stateOptions = stateSelection;
        //this.stateOptions.unshift({ label: '-select-', value: null });
        break;
        case 'G':
          this.genderOptions = [
            { label: 'Male', value: 1},
            { label: 'Female', value: 2},
            { label: 'Transgender', value: 3}
          ]
        break;
    }
  }

  onSave() {
    if(this.Id === 0) {
      const params = {
        'slno': this.Id,
        'name': this.name,
        'mailid': this.mailId,
        'dob': this.dob,
        'gender': this.gender,
        'phonenumber': this.phnNum,
        'address': this.address,
        'state': this.state,
        'district': this.district,
        'city': this.city,
        'pincode': this.pinCode,
        'landmark': this.landMark,
        'approvalstatus': 0,
        'flag': true
      }
      this.restApiService.post(PathConstants.ReporterRegistration_Post, params).subscribe((res: any) => {
        if (res) {
          this.onView();
          this.onClear();
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
        'u_name': this.name,
        'u_mailid': this.mailId,
        'u_dob': this.dob,
        'u_gender': this.gender,
        'u_phonenumber': this.phnNum,
        'u_address': this.address,
        'u_state': this.state,
        'u_district': this.district,
        'u_city': this.city,
        'u_pincode': this.pinCode,
        'u_landmark': this.landMark,
        'u_flag': true
      }

      this.restApiService.post(PathConstants.UpdateReporterRegistration_Update, params).subscribe(res => {
        if (res) {
          this.onView();
          this.onClear();
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
    this.restApiService.get(PathConstants.ReporterRegistration_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i: any) => {
            i.g_date = this.datePipe.transform(i.g_dob, 'dd-MM-yyyy, h:mm a')
            i.g_genderName = (i.g_gender === 1) ? 'Male' : (i.g_gender === 2) ? 'Female' : 'Transgender';
            i.g_approvalstatus = (i.g_approvalstatus === 0 ) ? 'Pending' :(i.g_approvalstatus === 1) ? 'Approved' : 'Rejected';
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

  onEdit(rowData: any) {
    this.Id = rowData.g_slno;
    this.name = rowData.g_name;
    this.mailId = rowData.g_mailid;
    this.dob = new Date(rowData.g_dob);
    this.gender = rowData.g_gender;
    this.genderOptions = [{ label: rowData.g_genderName, value: rowData.g_gender}];
    this.phnNum = rowData.g_phonenumber;
    this.address = rowData.g_address;
    this.state = rowData.g_state;
    this.stateOptions = [{ label: rowData.g_statename, value: rowData.g_state}];
    this.district = rowData.g_district;
    this.districtOptions = [{ label: rowData.g_districtname, value: rowData.g_district}];
    this.city = rowData.g_city;
    this.pinCode = rowData.g_pincode;
    this.landMark = rowData.g_landmark;
  }

  onClear() {
    this.Id = 0;
    this.name = null;
    this.mailId = null;
    this.address = null;
    this.state = null;
    this.stateOptions = [];
    this.district = null;
    this.districtOptions = [];
    this.city = null;
    this.landMark = null;
    this.pinCode = null;
    this.dob = null;
    this.gender = null;
    this.phnNum = null;
  }

  //checking existing mailid
  emailValidationCheck() {
    if (this.mailId !== undefined && this.mailId !== null && this.mailId.trim() !== '') {
      const entered_email: string = this.mailId.trim();
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
        this.mailId = null;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: 'Enter valid email address'
        })    
      }
    }
  }
}
