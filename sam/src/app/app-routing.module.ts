import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareComponent } from './software/software.component';
import { AddSoftwareComponent } from './add-software/add-software.component';
import { AddSoftwareSuiteComponent } from './add-software-suite/add-software-suite.component';
import { OverviewComponent } from './overview/overview.component';
import { ReportComponent } from './report/report.component';
import { AddmoredialogComponent } from './addmoredialog/addmoredialog.component';
import { UpgradelicenseComponent } from './upgradelicense/upgradelicense.component';
import { RenewlicenseComponent } from './renewlicense/renewlicense.component';
import { NotificationComponent } from './notification/notification.component';
// import { LicenseComponent } from './license/license.component';
import { LicensetableComponent } from './licensetable/licensetable.component';



import { AddlicenseComponent } from './addlicense/addlicense.component';
const routes: Routes = [
 {path:'',component:SoftwareComponent},
  {path:'software', component: SoftwareComponent },
  {path:'addForm',component:AddSoftwareComponent},
  {path:'addSuite' ,component:AddSoftwareSuiteComponent},
  {path:'overview',component:OverviewComponent},
  {path:'report',component:ReportComponent},
  {path:'upgrade/:ptype/:id',component:UpgradelicenseComponent},
  {path:'renew/:id',component:RenewlicenseComponent},
  {path:'notification',component:NotificationComponent},
  // {path:'license',component:LicenseComponent},
  {path:'license/:ptype/:id',component: LicensetableComponent, },
  {path:'addLicense/:ptype/:id',component:AddlicenseComponent},
  // {path:'licensetable',component:LicensetableComponent},
  {path:'addmoredialog',component:AddmoredialogComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
