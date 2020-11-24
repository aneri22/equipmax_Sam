import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SwDetailsService } from '../sw-details.service';

import { Router,ActivatedRoute } from '@angular/router';
import{MatSnackBar} from '@angular/material';

import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-addlicense',
  templateUrl: './addlicense.component.html',
  styleUrls: ['./addlicense.component.scss']
})
export class AddlicenseComponent implements OnInit {

addlicenseform: FormGroup;

submitted = false;
LicenTypes :any = [];
LocationTypes :any = [];
myControl = new FormControl();
id: number;
softwarename: string;
ptype: string;

constructor(private fb: FormBuilder,
private _softservice: SwDetailsService,
private _router: Router,
private _actroute: ActivatedRoute,
private snackBar: MatSnackBar
) {

this.addlicenseform = this.fb.group({

license_name: ['', Validators.required],

manufacturer_name: ['', Validators.required],

license_type: ['', Validators.required],

license_key: ['', Validators.required],


Total_License: ['', Validators.required],

vendor_name: ['', Validators.required],

picker: ['', Validators.required],

picker2: ['', Validators.required],

purchase_cost: ['', Validators.required],

allocate_location: ['', Validators.required],

department: ['', Validators.required],

Description: [''],


}

);

}


checknotify(){
  // this._softservice.sendMessge('Changed');
  this._softservice.isNotificationUpdated.next('changed');
}


submitForm() {
this.submitted = true;

if(this.ptype == 'software'){
// console.log(this.addlicenseform.value);
// let id = this.addlicenseform.value.software_ID;

let softobj = this.addlicenseform.value;
softobj['id'] = this.id;
console.log(softobj);
this._softservice.addLicenses(softobj).subscribe((data) => {
// alert('License Added Successfully');
this.snackBar.open('License added Successfully', 'Dismiss');
this.addlicenseform.reset();

this.checknotify();

this._softservice.updateCompliant(this.id,'No').subscribe(() => {
  console.log('Compliant Status Updated');
});

this._router.navigate(['/license/',`${this.ptype}`,`${this.id}`]);
})

}
else {
  let softobj = this.addlicenseform.value;
  softobj['id'] = this.id;

this._softservice.addSuiteLicense(softobj).subscribe((data) => {
this.snackBar.open('License added Successfully', 'Dismiss');
// alert('License Added Successfully');
this.addlicenseform.reset();

this.checknotify();

this._softservice.updateCompliantSuite(this.id,'No').subscribe(() => {
  console.log('Compliant Status Updated');
});

this._router.navigate(['/license/',`${this.ptype}`,`${this.id}`]);
})

  

}








}

goBack(){
  this._router.navigate(['/license/',`${this.ptype}`,`${this.id}`]);
}




ngOnInit() {
  this.ptype= this._actroute.snapshot.paramMap.get('ptype');

  this.id=+this._actroute.snapshot.paramMap.get('id');
  console.log(this.id);

  if(this.ptype == 'software'){
    this._softservice.getSingleSoftware(this.id).subscribe((data)=>{
      console.log(data);
      this.softwarename = data[0].Software_Name;
    })
  }
  else {
    this._softservice.getSingleSuite(this.id).subscribe((data)=>{
      console.log(data,'suite_name');
      this.softwarename = data[0].Software_suite_Name;
    })

  }



  

  

  this._softservice.getlicensetype1().subscribe((data)=>{
    this.LicenTypes = data;
    console.log(this.LicenTypes);
  })

  this._softservice.getlocationtype1().subscribe((data)=>{
    this.LocationTypes = data;
    console.log(this.LocationTypes);
  })

}



}
