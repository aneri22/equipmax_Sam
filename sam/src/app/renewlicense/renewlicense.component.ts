import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { SwDetailsService } from '../sw-details.service';
import{MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-renewlicense',
  templateUrl: './renewlicense.component.html',
  styleUrls: ['./renewlicense.component.scss']
})
export class RenewlicenseComponent implements OnInit {
  license:any={};

  newDate = new FormControl('',Validators.required);
  id:number;

  todaysDate: Date = new Date();

  expiryDate: Date;
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service:SwDetailsService,
    private snackBar: MatSnackBar) { }






  ngOnInit() {
 this.id=+this.route.snapshot.paramMap.get('id');
console.log(this.id);
this.service.getSingleLicen(this.id).subscribe((data)=>{
  this.license=data[0];
  this.expiryDate = new Date(data[0]['License_Expiry_date']);
  
})
  }

  checknotify(){
    // this._softservice.sendMessge('Changed');
    this.service.isNotificationUpdated.next('changed');
  }
  

  renewLicense(){
    let renewdate = new Date(this.newDate.value);
    console.log(renewdate);
    this.license.License_Expiry_date = renewdate;
    console.log(this.license,'After renew');
    this.service.renewLicense(this.license.License_ID,this.license).subscribe(()=>{
      // alert('License Renewed Successfully!');
      this.snackBar.open('License Renewed Successfully', 'Dismiss');
      this.checknotify();
      this.router.navigate(['software',]);
    })

   

    
    
    
  }

 




}
