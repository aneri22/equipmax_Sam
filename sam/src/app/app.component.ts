import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Event, NavigationStart, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwDetailsService } from './sw-details.service';



@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})

export class AppComponent  {

    // showLoadingIndicator = true;
// license_data: any =[];
// notificationslength: number;
// notifications: any = [];



// constructor(
// private _router:Router,
// private matIconRegistry: MatIconRegistry,
// private domSanitizer: DomSanitizer,
// private dialog: MatDialog,
// private _dataservice: SwDetailsService,
// private router: Router,

// ) {

// this.matIconRegistry.addSvgIcon(
// 'notifications_active',

// this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/notifications_active.svg')



// );


// this.matIconRegistry.addSvgIcon(
// 'account_circle',
// this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/account_circle.svg')
// );



// this.matIconRegistry.addSvgIcon(
// 'settings',
// this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/settings.svg')
// );



// this.matIconRegistry.addSvgIcon(
// 'exit_to_app',
// this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/exit_to_app.svg')
// )

// // this._router.events.subscribe((routerEvent: Event) => {
// //     if (routerEvent instanceof NavigationStart) {
// //         this.showLoadingIndicator = true;
// //     }
// //     if (routerEvent instanceof NavigationEnd) {
// //         this.showLoadingIndicator = false;
// //     }
// // });




// }



title = 'samapp';
// openDialog() {

// const dilogconfig = new MatDialogConfig();
// dilogconfig.disableClose = true;
// dilogconfig.autoFocus = true;
// dilogconfig.width = "53%";
// const ref = this.dialog.open(NotificationComponent, dilogconfig);
// this.router.events.subscribe(() => {
// ref.close();
// })



// }

// ngOnInit(){


//     this._dataservice.getNotifications().subscribe(data =>{
//         // this.notifications = data;
//         // this.notificationslength = this.notifications.length;
//         // let obj {
//         //     this.notifications['']
//         //     routerLink = `/renew/${this.notifications['license_id']}`;
//         // }

//         this.license_data = data;
//         this.license_data.forEach((license)=>{
//             let obj = {
//                     license_name: license['license_name'],
//                     days: license['difference'],
//                     lid: license['license_ID'],
//                     routerLink: `/renew/${license['license_id']}`
//                     };
//         this.notifications.push(obj);
//         })
//         this.notificationslength = this.notifications.length;

//         console.log(this.notifications);
        

//     })



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

// }









}
