import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-district-master-entry',
  templateUrl: './district-master-entry.component.html',
  styleUrls: ['./district-master-entry.component.scss']
})
export class DistrictMasterEntryComponent implements OnInit {

  districtName: any;
  selectedType: any;
  districtId: any;

  constructor(private restApiService: RestAPIService) { }

  ngOnInit(): void {
  }

  onSave() {
    // this.restApiService.get(PathConstants.DistrictMaster_Get).subscribe(res =>{

    // })
    // const params = {
    //      'u_districtid': 1,
    //   'u_districtname': 'Tuticorn',
    //      'flag': true
    //   }

    // this.restApiService.post(PathConstants.DistrictMaster_Update, params).subscribe(res => {

    // })

    const params = {
      'districtid': this.districtId,
      'districtname': this.districtName,
      'flag': this.selectedType
    }

    this.restApiService.post(PathConstants.DistrictMaster_Get, params).subscribe((res: any) => {

    })
  }
 
}
