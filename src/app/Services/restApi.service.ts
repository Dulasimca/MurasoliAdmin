import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
  
export class RestAPIService {
  BASEURL = 'https://localhost:44316/api/';
  // BASEURL = 'http://172.16.80.21:85/api/'
  
  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'Get,Post,Put,Delete,Options',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  constructor(private httpClient: HttpClient) { }

  get(url: any): Observable<any> {
    return this.httpClient.get(this.BASEURL + url);
  }

  post(url: string, obj: any): Observable<any> {
    return this.httpClient.post(this.BASEURL + url, obj).pipe(
      catchError(this.handleError)
    );
  }

  getByParameters(url: any, params: any): Observable<any> {
    return this.httpClient.get(this.BASEURL + url, { params: params });
  }

  put(url: any, obj:any): Observable<any> {
    return this.httpClient.put(this.BASEURL + url, obj).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: any, value: any): Observable<any> {
    return this.httpClient.delete(this.BASEURL + url, value);
  }

  handleError(error: any) {
    return throwError(error);
  }

}
