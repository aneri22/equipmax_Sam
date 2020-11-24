import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwDetailsService } from '../sw-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  license_data: any =[];
  notificationslength: number;
  notifications: any = [];

  isNotificationsUpdated: boolean;

  // clicked: boolean = false;




  
  
  
  constructor(
  private _router:Router,
  private matIconRegistry: MatIconRegistry,
  private domSanitizer: DomSanitizer,
  private dialog: MatDialog,
  private _dataservice: SwDetailsService,
  private router: Router,
  
  ) {
  
  this.matIconRegistry.addSvgIcon(
  'notifications_active',
  
  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/notifications_active.svg')
  
  
  
  );
  
  
  this.matIconRegistry.addSvgIcon(
  'account_circle',
  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/account_circle.svg')
  );
  
  
  
  this.matIconRegistry.addSvgIcon(
  'settings',
  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/settings.svg')
  );
  
  
  
  this.matIconRegistry.addSvgIcon(
  'exit_to_app',
  this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/exit_to_app.svg')
  )

  this._dataservice.isNotificationUpdated.subscribe( value => {
    if( value === 'changed'){
      this.notifications = [];
      this.updateNotification();
    }
});


  
  // this._router.events.subscribe((routerEvent: Event) => {
  //     if (routerEvent instanceof NavigationStart) {
  //         this.showLoadingIndicator = true;
  //     }
  //     if (routerEvent instanceof NavigationEnd) {
  //         this.showLoadingIndicator = false;
  //     }
  // });
  
  
  
  
  }



  // this._dataservice.checknotification$.subscribe( message => {
  //   if(message === 'change'){
  //     this.updateNotification();
  //   }
  // })
  
  openDialog() {
  
  const dilogconfig = new MatDialogConfig();
  dilogconfig.disableClose = true;
  dilogconfig.autoFocus = true;
  dilogconfig.width = "53%";
  const ref = this.dialog.open(NotificationComponent, dilogconfig);
  this.router.events.subscribe(() => {
  ref.close();
  })
  
  
  
  }


  // notificationClicked(){
  //   this.clicked = true;
  // }
  notificationClicked(license) {
    license["readflag"] = false;

    let not = this.license_data.filter(
      (item) => item["license_id"] == license["lid"]
    );
    console.log(not, "NOT");
    this._dataservice
      .updateReadStatus(not[0]["license_id"], not)
      .subscribe(() => {
        console.log("status changed");
      });
    this.updateNotificationlength();
    // if(license["days"] === 'today'){
      this.router.navigate(['/renew',license['lid']]);
    // }
  }

  updateNotificationlength() {
    this.notificationslength = 0;
    let filterdata = this.notifications.filter((item) => item["readflag"]);

    this.notificationslength = filterdata.length;
  }



 updateNotification() {
    this._dataservice.getNotifications().subscribe((data) => {
      this.license_data = data;
      this.license_data.forEach((license) => {
        let diff = license["difference"];
        let text = `License will get expired in`;
        let readval = true;
        if (license["difference"] === 0) {
          diff = "today";
          text = "License will expire ";
        }
        if (license["read_status"] === "unread") {
          readval = true;
        } else {
          readval = false;
        }
        if (license["difference"] < 0) {
          diff = "expired";
          text = "License is now";
        }
        let obj = {
          license_name: license["license_name"],
          lid: license["license_id"],
          days: diff,
          // routerLink: `/renew/${license["license_id"]}`,
          btntext: text,
          readflag: readval,
        };
        this.notifications.push(obj);
      });

      this.updateNotificationlength();
      // this.notificationslength = this.notifications.length;

      console.log(this.notifications);
    });
  }


 

  
  
  ngOnInit(){

  


   

    this.updateNotification();
  
  
     
  
      // this._dataservice.getNotifications().subscribe( data=>{
      //     this.license_data = data;
      //     let today = new Date();
      //     let thisyear = this.license_data.filter(license=> (new Date(license['license_expiry_date']).getFullYear() === today.getFullYear()));
          
      //     let numDaysBetween = function(d1,d2){
      //         let diff = Math.abs(d1.getTime()- d2.getTime());
      //         return diff / (1000* 60 * 60* 24);
      //     }
  
      //     thisyear.forEach((license)=>{
      //         let ldate = new Date(license['license_expiry_date']);
      //         if(ldate.getTime() - today.getTime() > 0){
      //             let diff = Math.abs(ldate.getTime() - today.getTime());
      //             let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      //             if(diffDays <=30){
      //                 let obj = {
      //                     license_name: license['license_name'],
      //                     days: diffDays,
      //                     lid: license['license_ID'],
      //                     routerLink: `/renew/${license['license_ID']}`
      //                 };
      //                 this.notifications.push(obj);
      //             }
      //         }
      //     });
  
      // console.log(this.notifications,"Notifications");
      // this.notificationslength = this.notifications.length;
      // })
  
  }
  
  
  
  
  
  
  

}
