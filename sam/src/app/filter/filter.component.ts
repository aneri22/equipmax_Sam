import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReportComponent } from '../report/report.component';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';
import { MatDialogContent } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  software = [];
  data = [];
  softwareTypes: any = [];
  softwareCategories: any = [];
  licenseTypes: any = [];
  publisherNames: any = [];
  subTypes: any = [];

  fromReports: any= [];

  publisherSubscription: Subscription;
  typeSubscription: Subscription;
  categorySubscription : Subscription;
  licenseSubscription: Subscription;
  subtypeSubscription: Subscription;


  firstTime: boolean = true;

  filterMap = new Map();



  


  

  //dataSource: MatDialogContent;

  constructor(public dialogRef: MatDialogRef<FilterComponent>,
    private _swservice: SwDetailsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public reportData: any) {

      // console.log( reportData,'Check');

      this.fromReports = reportData;
      console.log(this.fromReports,'ARRay');
      console.log(this.fromReports.length,'length');


     }

  publisher = true;
  type = false;
  category = false;
  license = false;
  subtype = false;
  llicense = [];
  filterBy = [];


putDataintoPublisher(data){
  this.publisherNames = data;

}
 
 




  ngOnInit() {  
    this._swservice.getPublishers().subscribe((data) => {
      // this.publisherNames = data;
      this.putDataintoPublisher(data);
    })
    this._swservice.getSTypes().subscribe((data) => {
      this.softwareTypes = data;
    })
    this._swservice.getSCategory().subscribe((data) => {
      this.softwareCategories = data;
    })
    this._swservice.getSubTypes().subscribe((data) => {
      this.subTypes = data;
    })
    this._swservice.getlicensetype1().subscribe((data) => {
      this.licenseTypes = data;
    })

    if(this.fromReports.length === 0){
      this.showPublisher();
    }
    else {
      if(this.fromReports.includes('System Software') || this.fromReports.includes('Application Software') || this.fromReports.includes('Programming Software')){
        this.showType();
      }
      if(this.fromReports.includes('Freeware') || this.fromReports.includes('Shareware') || this.fromReports.includes('Utility') || this.fromReports.includes('Browser')){
        this.showSubType();
      }
      let categoryarry = ['Accounting', 'Education', 'Graphics', 'Multimedia', 'Games', 'Internet', 'Development', 'Database'];

      for(let i of categoryarry){
        if(this.fromReports.includes(i)){
          this.showCategory();
        }
      }
      let licenses = ['GNU General Public License', 'EULA', 'Workstation license', 'Concurrent user license', 'Site license', 'Perpetual License', 'Proprietary license'];

      for(let i of licenses){
        if(this.fromReports.includes(i)){
          this.showLicense();
        }
      }
      




      
      
     
    

      
    }
    

  

  }


  toggleCheckBox(elementId){
    return (this.fromReports.indexOf(elementId) != -1) ? true : false;
 }



  closeDialog(value) {

    if(this.fromReports.length !== 0){
      this.fromReports.forEach(item => this.filterBy.push(item));
    }
    if(value === 'filter'){
      this.dialogRef.close({ event: 'close', data: this.filterBy });
    }
    else{
      this.dialogRef.close({ event: 'close', data: this.filterBy = [] })
    }


  }








  showPublisher() {
   
    this.publisher = true;
    this.type = false;
    this.category = false;
    this.license = false;
    this.subtype = false;
    this.filterBy = [];



  }



  showType() {
  
    this.publisher = false;
    this.type = true;
    this.category = false;
    this.license = false;
    this.subtype = false;
    this.filterBy = [];



  }



  showCategory() {
    
    this.publisher = false;
    this.type = false;
    this.category = true;
    this.license = false;
    this.subtype = false;
    this.filterBy = [];

  }

  showSubType(){
   
    this.subtype = true;
    this.publisher = false;
    this.type = false;
    this.category = false;
    this.license = false;
    this.filterBy = [];

    
  }



  showLicense() {
  
    this.publisher = false;
    this.type = false;
    this.category = false;
    this.license = true;
    this.subtype = false;
    this.filterBy = [];

  }



  filterChart(e,value) {
    if (e.checked) {
      this.filterBy.push(value);
      console.log(this.filterBy);
    }
    if (!e.checked) {
      let index = this.filterBy.indexOf(value);
      if (index > -1) {
        this.filterBy.splice(index, 1);
        console.log(this.filterBy);
      }
    }

  }



  // ngOnDestroy(){
  //   this.publisherSubscription.unsubscribe();
  //   this.typeSubscription.unsubscribe();
  //   this.categorySubscription.unsubscribe();
  //   this.subtypeSubscription.unsubscribe();
  //   this.licenseSubscription.unsubscribe();
  // }

}



