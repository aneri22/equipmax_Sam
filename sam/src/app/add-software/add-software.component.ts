import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SwDetailsService } from '../sw-details.service';
import{Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import{AddmoredialogComponent} from '../addmoredialog/addmoredialog.component';
import{MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-software',
  templateUrl: './add-software.component.html',
  styleUrls: ['./add-software.component.scss']
})
export class AddSoftwareComponent implements OnInit {

  addsoftwareForm: FormGroup;
  addsoftwaresuite:FormGroup;
  submitted = false;
  show=true;
  STypes: any = [];
  SubTypes: any = [];
  SCategorys: any = [];
  myControl = new FormControl();

constructor(private router: Router,
private fb: FormBuilder,
private _softservice: SwDetailsService,
private dialog: MatDialog,
private snackBar: MatSnackBar
) {
this.addsoftwareForm = this.fb.group({
Product_Name: ['', Validators.required],
Software_Type: ['', Validators.required],
Software_Category: ['', Validators.required],
manufacturer_name: ['', Validators.required],
Version: ['', Validators.required],
Publisher_Name: ['', Validators.required],
Description: ['', Validators.required],
Subtype: ['', Validators.required]
});

this.addsoftwaresuite =this.fb.group({
  suite_name:['',Validators.required],
  version:['',Validators.required],
  Software_category:['',Validators.required],
  manufacturer_name:['',Validators.required],
  publisher_name:['',Validators.required],
  Software_Type:['',Validators.required],
  Software_subtype:['',Validators.required]
})
}

openDialog() {
  const dialogRef = this.dialog.open(AddmoredialogComponent, {
      width: '40%',
      autoFocus: true,
      disableClose: true,
  })
}


navigateTo(value) {
  if (value=="addForm") {
     this.show=true;
  }
  else if(value=="addSuite")
  this.show=false;
}


submitForm() {
console.log(this.addsoftwareForm.value);
this._softservice.postSoft(this.addsoftwareForm.value).subscribe((data)=>{
  console.log(data);
  this.snackBar.open('Software Suite added Successfully','Dismiss');
})
this.addsoftwareForm.reset();
this.openDialog();
}

submitSuiteForm(){
  console.log(this.addsoftwaresuite.value);
  this._softservice.postSoftSuite(this.addsoftwaresuite.value).subscribe((data)=>{
    console.log(data);
    // alert('Software Suite added Successfully');
    this.snackBar.open('Software Suite added Successfully', 'Dismiss');

  })
  this.addsoftwaresuite.reset();
  this.openDialog();
}





ngOnInit() {

  this._softservice.getSTypes().subscribe((data)=>{
    this.STypes = data;
  })

  this._softservice.getSubTypes().subscribe((data)=>{
    this.SubTypes = data;
  })

  this._softservice.getSCategory().subscribe((data)=>{
    this.SCategorys = data;
  })

}
}
