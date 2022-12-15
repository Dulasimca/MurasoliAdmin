import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../Common-Modules/messages';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { AuthService } from '../Services/auth.service';
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

  constructor(private route: Router, private restApiService: RestAPIService, private messageService: MessageService, private _authService: AuthService) {

  }

  ngOnInit(): void {
    this._authService.logout();
    this.restApiService.get(PathConstants.Users_Get).subscribe(res => {
      this.loginData = res.Table;
    })
  }

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if (inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }

  onLogin() {
    this.loginData.forEach((i: any) => {
      if (i.g_username === this.username && i.g_password === this.password)
       {
        this._authService.login();
        this.route.navigate(['/dashboard'])
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_INVALID, detail: ResponseMessage.LoginFailed
        })
      }
    })
  }

  // login() {
  //   if (this.username !== '' && this.password !== '') {
  //     localStorage.setItem('UserInfo', JSON.stringify(this.username));
  //     const user = localStorage.getItem('UserInfo');
  //   }
  // }

}

