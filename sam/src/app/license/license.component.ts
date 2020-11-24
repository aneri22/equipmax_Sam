import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DialogExampleComponent } from "../dialog-example/dialog-example.component";
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';

export interface Element {

  workstation: string;

  user: string;

  licensekey: string;

  licensetype: string;

  allocatelicense: string;

}
const ELEMENT_DATA: Element[] = [

  {

    workstation: "HP",

    user: "A shah",

    licensekey: "121hgs91",

    licensetype: "GNU",

    allocatelicense: "Adobe Acrobat"

  },

  {

    workstation: "ThinkStation",

    user: "Jack",

    licensekey: "7GH$HKL9",

    licensetype: "EULA",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Sony",

    user: "patel",

    licensekey: "178jHGF1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Kronos",

    user: "Jitendra",

    licensekey: "743#HKK9",

    licensetype: "Apache License 2.0",

    allocatelicense: "Open Software Licensed"

  },

  {

    workstation: "Xerox Alto",

    user: "M Suresh",

    licensekey: "1897JHG1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Dell",

    user: "H shah",

    licensekey: "76hGDF7#",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },



];
export interface Installations {

  workstation: string;

  user: string;

  licensekey: string;

  licensetype: string;

  allocatelicense: string;

}

const Installations_data: Installations[] = [

  {

    workstation: "HP",

    user: "A shah",

    licensekey: "121hgshd1",

    licensetype: "GNU",

    allocatelicense: "Adobe Acrobat"

  },

  {

    workstation: "ThinkStation",

    user: "Jack",

    licensekey: "121hgshd1",

    licensetype: "EULA",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Sony",

    user: "patel",

    licensekey: "121hgshd1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Kronos",

    user: "Jitendra",

    licensekey: "121hgshd1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Xerox Alto",

    user: "M Suresh",

    licensekey: "121hgshd1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Dell",

    user: "H shah",

    licensekey: "121hgshd1",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Dell",

    user: "H shah",

    licensekey: "121hgshd1",

    licensetype: "GNU",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "ThinkStation",

    user: "Jack",

    licensekey: "H78*&HGH",

    licensetype: "Site",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Sony",

    user: "patel",

    licensekey: "878H6%*0",

    licensetype: "Apache License 2.0",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Kronos",

    user: "Jitendra",

    licensekey: "7HJG753$",

    licensetype: "Perpetual",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Xerox Alto",

    user: "M Suresh",

    licensekey: "%768HJ4K",

    licensetype: "EULA",

    allocatelicense: "Acrobat 2.0"

  },

  {

    workstation: "Dell",

    user: "H shah",

    licensekey: "564#GJHD",

    licensetype: "GNU",

    allocatelicense: "Acrobat 2.0"

  },



];

export interface Users {

  username: string;

  workstation: string;

  server: string;

  email: string;

  phone: number;

}

const Users_data: Users[] = [

  {

    username: "Vishal",

    workstation: "Dell",

    server: "Application",

    email: "vg@gmail.com",

    phone: 876567876

  },

  {

    username: "Isha",

    workstation: "HP",

    server: "Application",

    email: "isha.m@gmail.com",

    phone: 9867545767

  },

  {

    username: "Sony",

    workstation: "Corsair One Pro i180",

    server: "Proxy",

    email: "sony@gmail.com",

    phone: 7809675689

  },

  {

    username: "Kronos",

    workstation: "Apple Mac Pro",

    server: "Real Time Communication",

    email: "k.ronos@gmail.com",

    phone: 9887865654

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

];

const allocate_data: Users[] = [

  {

    username: "Vishal",

    workstation: "Dell",

    server: "Application",

    email: "vg@gmail.com",

    phone: 876567876

  },

  {

    username: "Isha",

    workstation: "HP",

    server: "Application",

    email: "isha.m@gmail.com",

    phone: 9867545767

  },

  {

    username: "Sony",

    workstation: "Corsair One Pro i180",

    server: "Proxy",

    email: "sony@gmail.com",

    phone: 7809675689

  },

  {

    username: "Kronos",

    workstation: "Apple Mac Pro",

    server: "Real Time Communication",

    email: "k.ronos@gmail.com",

    phone: 9887865654

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

  {

    username: "Suresh",

    workstation: "Mac Mini",

    server: "Application",

    email: "suresh@gmail.com",

    phone: 8897978987

  },

  {

    username: "Shah",

    workstation: "HP Z240 SFF",

    server: "Application",

    email: "shah.m@gmail.com",

    phone: 9876789067

  },

];

export interface Workstation {



  workstation: string;

  server: string;

  no_of_inst: number;

  no_of_licen_inst: string;

  user: string;

  no_of_unlicen_inst: string;

}

const WS_data: Workstation[] = [

  {



    workstation: "Dell",

    server: "Application",

    no_of_inst: 2,

    no_of_licen_inst: "1",

    user: "Suresh",

    no_of_unlicen_inst: "NA",



  },

  {



    workstation: "HP",

    server: "Application",

    no_of_inst: 3,

    no_of_licen_inst: "1",

    user: "Isha",

    no_of_unlicen_inst: "NA"

  },



  {



    workstation: "Corsair One Pro i180",

    server: "Proxy",

    no_of_inst: 3,

    no_of_licen_inst: "NA",

    user: "Sony",

    no_of_unlicen_inst: "2"

  },

  {



    workstation: "Apple Mac Pro",

    server: "Real Time Communication",

    no_of_inst: 2,

    no_of_licen_inst: "1",

    user: "kronos",

    no_of_unlicen_inst: "1"

  },

  {



    workstation: "Mac Mini",

    server: "Application",

    no_of_inst: 4,

    no_of_licen_inst: "3",

    user: "Shah",

    no_of_unlicen_inst: "1"

  },

  {



    workstation: "HP Z240 SFF",

    server: "Application",

    no_of_inst: 2,

    no_of_licen_inst: "2",

    user: "Shah",

    no_of_unlicen_inst: "NA"

  },

  {



    workstation: "HP Z240 SFF",

    server: "Application",

    no_of_inst: 2,

    no_of_licen_inst: "2",

    user: "Shah",

    no_of_unlicen_inst: "7"

  },

  {



    workstation: "HP Z240 SFF",

    server: "Application",

    no_of_inst: 2,

    no_of_licen_inst: "NA",

    user: "Shah",

    no_of_unlicen_inst: "2"

  },

  {



    workstation: "HP Z240 SFF",

    server: "Application",

    no_of_inst: 2,

    no_of_licen_inst: "2",

    user: "Shah",

    no_of_unlicen_inst: "3"

  },

];

export interface History {



  discovered_date: string;

  workstation: string;

  user: string;



}

const History_Data: History[] = [

  {

    discovered_date: "2011-01-12",

    workstation: "Dell",

    user: "Sony"



  },

  {



    discovered_date: "2001-07-01",

    workstation: "Mac MiniMac Mini",

    user: "Vishal"

  },



  {



    discovered_date: "2006-11-09",

    workstation: "Corsair One Pro i180",

    user: "Shah"

  },



  {



    discovered_date: "2006-05-09",

    workstation: "Apple Mac Pro",

    user: "Suresh"

  },

  {



    discovered_date: "2001-11-09",

    workstation: "HP",

    user: "Sneha"

  },

  {



    discovered_date: "2000-12-01",

    workstation: "Apple Mac Pro",

    user: "Neha"

  },

  {



    discovered_date: "2001-11-10",

    workstation: "HP",

    user: "Aman"

  },

  {



    discovered_date: "2001-11-09",

    workstation: "HP",

    user: "Sneha"

  },

  {



    discovered_date: "2001-11-09",

    workstation: "lenovo",

    user: "Aneri"

  },

  {



    discovered_date: "1999-11-09",

    workstation: "Mac Mini",

    user: "Madhu"

  },

  {



    discovered_date: "2012-02-09",

    workstation: "HP",

    user: "Sneha"

  },

  {



    discovered_date: "2015-11-09",

    workstation: "Dell",

    user: "Pooja"

  },

  {



    discovered_date: "2001-1-09",

    workstation: "HP",

    user: "Richa"

  },

  {



    discovered_date: "2001-11-04",

    workstation: "Google",

    user: "Neha"

  },

  {



    discovered_date: "2001-11-09",

    workstation: "Amazon",

    user: "Aarti"

  },

  {



    discovered_date: "2001-1-09",

    workstation: "HP",

    user: "Richa"

  },

  {



    discovered_date: "2001-11-04",

    workstation: "Google",

    user: "Neha"

  },

  {



    discovered_date: "2001-11-09",

    workstation: "Amazon",

    user: "Aarti"

  },

];

export interface License {



  licen_no: number;

  licen_type: string;

  licen_name: string;

  licen_key: string;



}

export interface PeriodicElement {



  position: number;



  Product_Name: string;



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
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {

  licenses = [];

  displayedColumns: string[] = ['Product_Name', 'License_Name', 'License_Type', 'Publisher_Name', 'Software_Type', 'Subtype', 'Software_Category', 'Compliance_status', 'Total_License', 'Consumed'];
  dataSource: MatTableDataSource<PeriodicElement>;
  Product_Name: string;

  openDialog() {
    this.dialog.open(DialogExampleComponent);

  }

  constructor(public dialog: MatDialog,
    private router: Router,
    private swDetails: SwDetailsService,
    private http: HttpClient,
  ) {}




  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild('MatPaginator_install') paginator2: MatPaginator;
  @ViewChild('MatPaginator_user') paginator3: MatPaginator;
  @ViewChild('MatPaginator_ws') paginator4: MatPaginator;
  @ViewChild('MatPaginator_hist') paginator5: MatPaginator;
  @ViewChild('MatPaginator_allocate') paginator6: MatPaginator;



  ngOnInit() {
    this.swDetails.getLicen().subscribe((branches:any) => {
      console.log(branches)
      this.licenselist = new MatTableDataSource(branches);
      this.licenselist.paginator = this.paginator1;

    });

    this.installationlist.paginator = this.paginator2;
    this.userList.paginator = this.paginator3;
    this.wslist.paginator = this.paginator4;
    this.historylist.paginator = this.paginator5;
    this.allocateList.paginator = this.paginator6;

  }

  goToAdd() {
    this.router.navigate(['/addLicenseForm']);
  }

  goToUpgrade() {
    this.router.navigate(['/upgrade']);
  }

  goToRenew() {

    this.router.navigate(['/renew']);

  }


  installationTable = ['workstation', 'user', 'licensekey', 'licensetype', 'allocatelicense'];
  installationlist = new MatTableDataSource(Installations_data);

  userTable = ['username', 'workstation', 'server', 'email', 'phone'];
  userList = new MatTableDataSource(Users_data);

  allocateTable = ['username', 'workstation', 'server', 'email', 'phone'];
  allocateList = new MatTableDataSource(Users_data);

  workstationTable = ['workstation', 'server', 'user', 'no_of_inst', 'no_of_licen_inst', 'no_of_unlicen_inst'];
  wslist = new MatTableDataSource(WS_data);

  HistoryTable = ['discovered_date', 'workstation', 'user'];
  historylist = new MatTableDataSource(History_Data);

  licenseTable = ['licen_type', 'licen_name', 'licen_key', 'actions', 'remove'];
  licenselist = new MatTableDataSource<License>();

}

