import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-master-entry',
  templateUrl: './state-master-entry.component.html',
  styleUrls: ['./state-master-entry.component.scss']
})
export class StateMasterEntryComponent implements OnInit {

  stateName: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    
  }

}
