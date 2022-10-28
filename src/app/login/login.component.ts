import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  showPswd: boolean = true;
  loginData: any[] = [];


  constructor(private route: Router, private restApiService: RestAPIService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.restApiService.get(PathConstants.Users_Get).subscribe(res => {
     
      this.loginData = res.Table;
    })
  }

  onShowPswd() {

  }

  onLogin() {
  this.loginData.forEach((i:any) => {
    if(
    i.emailid === this.username
    ) {
   this.route.navigate(['/dashboard'])
    } else {
      console.log('No match')
      this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_INVALID, detail: ResponseMessage.LoginFailed
          })
    }
    
  })
}
}

