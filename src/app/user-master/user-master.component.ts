import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    
  }

}
