import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwReportsService {

  constructor(private http:HttpClient) { }

  totalsoftwares = "/api/totalsoftwares";

  allData = "/api/reports";


  getTotalSoftwares(){
    return this.http.get(this.totalsoftwares);
  }

  getAllData(){
    return this.http.get(this.allData) .pipe(
      publishReplay(1),
      refCount()
    );

  }


}
