import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  showPswd: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  onShowPswd() {

  }

  onLogin() {

  }


}
