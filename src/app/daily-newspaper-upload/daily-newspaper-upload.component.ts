import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PathConstants } from '../Common-Modules/Pathconstants';
import { RestAPIService } from '../Services/restApi.service';

@Component({
  selector: 'app-daily-newspaper-upload',
  templateUrl: './daily-newspaper-upload.component.html',
  styleUrls: ['./daily-newspaper-upload.component.scss']
})
export class DailyNewspaperUploadComponent implements OnInit {

  date: any;
  NewsData: any[] = [];
  public formData = new FormData();
  FileName: any;
  slNo: any;


  constructor(private http: HttpClient, private restApiService: RestAPIService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.onView();
  }

  public uploadFile = (event: any) => {
    this.formData = new FormData()
    let fileToUpload: any = <File>event.target.files[0];
    const folderName = 'Newspapers';
    console.log('d', folderName)
    const uploadedFilename = (fileToUpload.name).toString();
    const extension = uploadedFilename.substring(uploadedFilename.lastIndexOf('.') + 1, uploadedFilename.length);
    var filenameWithExtn = extension;
    const filename = fileToUpload.name + '^' + folderName + '^' + filenameWithExtn;
    this.formData.append('file', fileToUpload, filename);
    this.FileName = fileToUpload.name;
    console.log('t', filename)
    this.http.post(this.restApiService.BASEURL + PathConstants.FileUpload_Post, this.formData)
      .subscribe(event => {
      }
      );
    return filenameWithExtn;
  }


  onSave() {
    const params = {
      'id': this.slNo,
      'newspaperdate': this.date,
      'filename': this.FileName,
      'flag': true
    }
    this.restApiService.post(PathConstants.DailyNewsPaper_Post, params).subscribe(res => {

    })
  }

  onView() {
    this.restApiService.get(PathConstants.DailyNewsPaper_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.Table.length !== 0) {
          res.Table.forEach((i:any) => {
           i.newspaperdate = this.datePipe.transform(i.newspaperdate,'dd-MM-yyyy')
            console.log('1',this.date)
          })
          this.NewsData = res.Table
        }
      }
    })
  }

  onEdit(rowData: any) {

  }
}
