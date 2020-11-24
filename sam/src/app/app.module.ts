import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatListModule,} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import{MatSidenavModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableExporterModule } from 'mat-table-exporter';


import { ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SoftwareComponent } from './software/software.component';
import { AddSoftwareComponent } from './add-software/add-software.component';
import { AddSoftwareSuiteComponent } from './add-software-suite/add-software-suite.component';
import { OverviewComponent } from './overview/overview.component';
import { ReportComponent } from './report/report.component';


import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NotificationComponent } from './notification/notification.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { UpgradelicenseComponent } from './upgradelicense/upgradelicense.component';
import { RenewlicenseComponent } from './renewlicense/renewlicense.component';
// import { LicenseComponent } from './license/license.component';
import { FilterComponent } from './filter/filter.component';
import { AddlicenseComponent } from './addlicense/addlicense.component';
import { LicensetableComponent } from './licensetable/licensetable.component';
import { AddmoredialogComponent } from './addmoredialog/addmoredialog.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SoftwareComponent,
    AddSoftwareComponent,
    AddSoftwareSuiteComponent,
    OverviewComponent,
    ReportComponent,
    NotificationComponent,
    DialogExampleComponent,
    UpgradelicenseComponent,
    RenewlicenseComponent,
    // LicenseComponent,
    FilterComponent,
    AddlicenseComponent,
    LicensetableComponent,
    AddmoredialogComponent,
    HeaderComponent
  ],
  entryComponents:[NotificationComponent,FilterComponent, DialogExampleComponent,AddmoredialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule ,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    MatRadioModule,HttpModule,
    MatBadgeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule ,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTableExporterModule
   
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
