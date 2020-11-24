
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatDialog, MatCheckboxChange } from '@angular/material';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';
import { Router } from '@angular/router';
import { VERSION } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
// import * as sw from 'software.json';

export interface PeriodicElement {
position: number;
Software_Name: string;
License_Name: string;
License_Type: string;
Publisher_Name: string;
Software_Type: string;
Subtype: string;
Software_Category: string;
Compliance_status: string;
Total_License: number;
Consumed: number;
}
@Component({
  selector: 'app-software', 
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  isLoading=false;
  toggleLoading=()=>{
    this.isLoading=true;
    setTimeout(()=>{
      this.isLoading=false;
    },3000);
  };
    
  
  software = [];
  filteredbranches = [];
  displayedColumns: string[] = ['Product_Name', 'Publisher_Name', 'Software_Type', 'Subtype', 'Software_Category', 'Total_License', 'Consumed'];
  dataSource: MatTableDataSource<PeriodicElement>;
  Product_Name: string;
  filterCheckboxes;
  checklist: any;
  checkedList: any;
  isSelected: boolean;
  step: number = 0;
  data = [];
  ds: PeriodicElement;
  msg: string = 'No Rows Found';
  show: boolean = false;
  showlname = false;
  showltype = false;
  uncheck: boolean;
  show2: boolean = false;
  isSelected1: boolean;
  isSelected2: boolean;
  isSelected3: boolean;
  isSelected4: boolean;
  isSelected5: boolean;
  isSelected6: boolean;
  isSelected7: boolean;
  isSelected8: boolean;
  isSelected9: boolean;
  isSelected10: boolean;
  isSelected11: boolean;
  isSelected12: boolean;
  isSelected13: boolean;
  isSelected14: boolean;
  isSelected15: boolean;
  isSelected16: boolean;
  isSelected17: boolean;
  isSelected18: boolean;
  isSelected19: boolean;
  isSelected20: boolean;
  
  setStepFilter(index: number) {
  
  }
  
  constructor(private swDetails: SwDetailsService,
  private http: HttpClient,
  private route: Router,
  private matIconRegistry: MatIconRegistry,
  private domSanitizer: DomSanitizer) {
           this.matIconRegistry.addSvgIcon(
                       'add_circle_outline',
  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/add_circle_outline.svg'));
  }



  clearAll() {
    // this.filterBy2 = this.filterBy;
    this.filterBy = [];
    this.filteredSoftwares = new Set();
    this.putSoftwareinSet();
    console.log(this.filterBy, "clear");
    this.isSelected = false;
    this.isSelected1 = false;
    this.isSelected2 = false;
    this.isSelected3 = false;
    this.isSelected4 = false;
    this.isSelected5 = false;
    this.isSelected6 = false;
    this.isSelected7 = false;
    this.isSelected8 = false;
    this.isSelected9 = false;
    this.isSelected10 = false;
    this.isSelected11 = false;
    this.isSelected12 = false;
    this.isSelected13 = false;
    this.isSelected14 = false;
    this.isSelected15 = false;
    this.isSelected16 = false;
    this.isSelected17 = false;
    this.isSelected18 = false;
    this.isSelected19 = false;
    this.isSelected20 = false;
    // this.filterBy = [];
    // this.putSoftwareinSet();
    this.uncheck = false;
    this.show2 = false;

  }
  
@ViewChild(MatPaginator) paginator: MatPaginator;
  
  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.filteredData.length == 0) {
           this.show = true;
}
else{
  this.show=false;
  }
}
 filterBy = [];
filterSoft(e, value) {

  if (e.checked) {
    this.show2 = true;
   this.filterBy.push(value);
   this.putSoftwareinSet();
  }
  
if (!e.checked) {
  let index = this.filterBy.indexOf(value);
  if (index > -1) {
  this.filterBy.splice(index, 1);
this.filteredSoftwares = new Set();
this.putSoftwareinSet();
   } 
 }
}
  
filteredSoftwares: any = new Set();
 putSoftwareinSet() {
for (let i = 0; i <= this.filterBy.length - 1; i++) {
for (let j = 0; j <= this.software.length - 1; j++) {
for (let k in this.software[j]) {
if (this.filterBy[i] === this.software[j][k]) {
  console.log(this.software[k]);
  this.filteredSoftwares.add(this.software[j]);
    }
   }
  }
 }
//this.setNotAssignedIfNull(this.filteredSoftwares);
 
this.dataSource.data = Array.from(this.filteredSoftwares)
  console.log(this.filteredSoftwares.size, 'l');
  if ((this.filterBy.length == 0) || (this.filteredSoftwares.size == 0)) {
  
  this.dataSource.data = Array.from(this.software);
  
  }
 
  }



  goToLicenseTable(softobj){
    this.route.navigate(['/license/',softobj['ptype'],softobj['sid']]);
    console.log('You clicked', softobj);
  }

  setNotAssignedIfNull(someobj){
    for(let i = 0; i<someobj.length; i++){
      if((someobj[i].License_Name === null) || (someobj[i].LType_Name === null)){
        someobj[i].License_Name = "Not Assigned";
        someobj[i].Ltype_Name = "Not Assigned";
      }
    }
    
  }
  
  ngOnInit() {


  // this.swDetails.getSoft().subscribe((data)=>{
  //   console.log(data);
  // })
   
  this.swDetails.getSoft().subscribe((branches:any) => {
   console.log(branches[3].Software_ID);
   this.setNotAssignedIfNull(branches);
   this.dataSource = new MatTableDataSource(branches);
   this.fetchData(branches);
   this.dataSource.paginator = this.paginator;
   this.dataSource.filterPredicate = function (data, filter: string): boolean { 
   return data['sname'].toLowerCase().includes(filter);
 };
   });
  }

  
 fetchData(branch) {
  this.software = branch;
  console.log(this.software, 'Lets confirm');
   } 


}

