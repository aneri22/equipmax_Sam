import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddSoftwareComponent } from './add-software/add-software.component';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url='http://localhost:3000/enroll';
  constructor(private _http:HttpClient) { }

  enroll(user:AddSoftwareComponent ){
    return this._http.post<any>(this._url,user);

  }
}
