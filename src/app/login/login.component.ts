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


  constructor(private route: Router, private restApiService: RestAPIService, private messageService: MessageService) { 

  }

  ngOnInit(): void {
    this.restApiService.get(PathConstants.Users_Get).subscribe(res => {
     
      this.loginData = res.Table;
    })
  }

  onShowPswd() {
    console.log('1')
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if (inputValue.type === 'password') {
      inputValue.type = 'text';
    console.log('2')
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    console.log('3')
    }
  }

  onLogin() {
  this.loginData.forEach((i:any) => {
    if(
   ( i.username === this.username && i.password === this.password)
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
  this.login();
}

login(){
  if (this.username !== '' && this.password !== '' ) { 
    localStorage.setItem('UserInfo', JSON.stringify(this.username));
    console.log('q',this.username)
    const user = localStorage.getItem('UserInfo');

    console.log('u',user)

  }
}

}

