import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogExampleComponent } from "../dialog-example/dialog-example.component";
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AddmoredialogComponent} from '../addmoredialog/addmoredialog.component';
import{MatSnackBar} from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
selector: 'app-licensetable',
templateUrl: './licensetable.component.html',
styleUrls: ['./licensetable.component.scss']
})

  
export class LicensetableComponent implements OnInit, OnDestroy {

allocateForm: FormGroup;

filteredOptions: Observable<string[]>;

softID : any;
softArray: any;
sname : string;
lname : string;
ltype : string;
pname : string;
stype : string;
ssubtype: string;
scategory: string;

Alluserlicenses: any = [];

users: any = [];

alloclicense: any = [];





softwareinfosubscription: Subscription;

uwisubscription: Subscription;

historysubscription : Subscription;

uwiData : any = [];

totallicen: number;
liceninstal: number;
unliceninstal: number;

shownoUser: boolean = false;



Select = 'Select';


todaysDate = new Date();

today = this.todaysDate.toDateString();


installed = true;
uninstalled = false;

nolicenses = false;

selected = 'week';

filteredHistory: History[] = [];


licenses:any;
licensenames: any = [];


showSoftwareHistory: boolean = true;
showLicenseHistory: boolean = false;

isUserAdded: boolean;




lilist = [];
allocateList: any = [];
installationlist:any=[];
Userlist:any=[];
wslist:any=[];
history:any=[];
softwarehistorylist: any = [];
softhistorydata: any = [];
showNoData: boolean = false;

displayedColumns: string[] = ['Product_Name', 'License_Name', 'License_Type', 'Publisher_Name', 'Software_Type', 'Subtype', 'Software_Category', 'Compliance_status', 'Total_License', 'Consumed'];

dataSource: MatTableDataSource<any>;

Product_Name: string;

list;
ptype;

inst = [];

wst = [];

historyarray = [];
openDialog(licensobj) {
    
    let id = licensobj.License_ID;
    console.log(id);
    console.log(licensobj);
    const dialogRef = this.dialog.open(DialogExampleComponent, {
        width: '40%',
        autoFocus: true,
        disableClose: true,
        data: { licenseid: id, name: this.lname , liobj: licensobj}
    })

    
    dialogRef.afterClosed().subscribe(result => {
        if(result != ''){
            let deletedid = result.data;
            console.log('deletedId',deletedid);
            for(let i = 0; i< this.lilist.length; i++ ){
                    if(deletedid === this.lilist[i]['License_ID']){
                    let index = this.lilist.indexOf(this.lilist[i]);
                    this.lilist.splice(index,1);
                    console.log(this.lilist,'And deleted index is ',index);
                    this.licenselist = new MatTableDataSource(this.lilist);
                    this.licenselist.paginator = this.paginator1;
                   
                    } 
            }
            if (this.lilist.length === 0){
                this.nolicenses = true;
            }
        
        }
    })


}

constructor(public dialog: MatDialog,

private router: Router,
private actrouter: ActivatedRoute,
private fb1: FormBuilder,
private swDetails: SwDetailsService,
private snackBar: MatSnackBar,

private http: HttpClient,

) {

    let id = 
    console.log('Software Id is', this.softID);
    this.allocateForm = this.fb1.group({
        user: ['', Validators.required],
        license: ['', Validators.required]
        });

        this.actrouter.params.subscribe(params =>{
            let id  = +params['id'];
            this.swDetails.isUserAlloted.subscribe( value => {
                if( value === 'yes'){
                    this.Userlist = [];
                    this.swDetails.getuwi(id).subscribe( data => {
                                let userdata: any = data;
                                this.Userlist = new MatTableDataSource(userdata);   
                                // this.Userlist.paginator = this.paginator7;

                    })
                }
            })
        })
}




openDialog2() {
    const dialogRef = this.dialog.open(AddmoredialogComponent, {
        width: '40%',
        autoFocus: true,
        disableClose: true,
    })
  }

openHistory(value){
    if(value === 'Licenses'){
        this.showLicenseHistory = true;
        this.showSoftwareHistory = false;

    }
    else {
        this.showSoftwareHistory = true;
        this.showLicenseHistory = false;
    }

}
  



// @ViewChild(MatPaginator) paginator1: MatPaginator;
@ViewChild('MatPaginator_license') paginator1: MatPaginator;
@ViewChild('MatPaginator_user') paginator7: MatPaginator;
@ViewChild('MatPaginator_install') paginator2: MatPaginator;
@ViewChild('MatPaginator_ws') paginator4: MatPaginator;
@ViewChild('MatPaginator_softhist') paginator3: MatPaginator;
@ViewChild('MatPaginator_hist') paginator5: MatPaginator;
@ViewChild('MatPaginator_userlist') paginator6: MatPaginator;


// @ViewChild('content') content: ElementRef;

// @ViewChild('MatPaginator_softhist') paginator8: MatPaginator;


private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.users.filter(option => option['User_Name'].toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user): string {
    console.log(user);
      return user && user.User_Name ?  user.User_Name: '';
}



buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    // console.log(.length, "DATATATAT");

    data.forEach(function (row) {
      var dataRow = [];

      // columns.forEach(function (column) {
      dataRow.push(row["work_name"].toString());
      dataRow.push(row["user_name"].toString());
      dataRow.push(row["license_name"].toString());
      dataRow.push(row["license_key"].toString());
      // });

      body.push(dataRow);
    });



    console.log(body, "Inside BODY ha!");
    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns),
      },
    };
  }

  public SavePDF(sname): void {
    let dd = {
      content: [
        { text: `Installations of ${sname}`, style: "header" },
        this.table(this.inst, [
          // "name",
          // "age",
          "Work Station",
          "User Name",
          "License Name",
          "License Key",
        ]),
      ],
    };

    console.log(dd, "Inside DD");

    pdfMake.createPdf(dd).open();
  }

  buildTableBody2(data, columns) {
    var body = [];

    body.push(columns);

    // console.log(.length, "DATATATAT");

    data.forEach(function (row) {
      var dataRow = [];

      // columns.forEach(function (column) {
      dataRow.push(row["work_name"]);
      dataRow.push(row["server_name"]);
      dataRow.push(row["user_name"]);
      dataRow.push(row["no_of_instal"]);
      dataRow.push(row["licen_no_instal"]);
      dataRow.push(row["unlicen_no_instal"]);
      // });

      body.push(dataRow);
    });



    console.log(body, "Inside BODY ha!");
    return body;
  }

  table2(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody2(data, columns),
      },
    };
  }

  public SavePDF2(sname): void {
    let dd = {
      content: [
        { text: `Workstations where ${sname} is installed.`, style: "header" },
        this.table2(this.wst, [
          // "name",
          // "age",
          "Work Station",
          "Server",
          "User Name",
          "No of Installations",
          "Licensed Installations",
          "Unlicensed Installations"
        ]),
      ],
    };

    console.log(dd, "Inside DD");

    pdfMake.createPdf(dd).open();
  }




AllocateLicense(){
    let lid = this.allocateForm.controls.license.value;
    let id = this.allocateForm.controls.user.value['User_ID'];

    let obj = {
        userid: id,
        licenseid: lid
    }
    console.log(this.Alluserlicenses);

    let matchfound = false;
    this.Alluserlicenses.forEach(item => {
        if(item['user_id'] == id ){
            if(item['license_id'] == lid)
            matchfound = true;
        }
    })

    if(!matchfound){
        if(isNaN(id)){
            alert('Such User does not exist');
        }
        else {
            console.log('User allocated');
            this.swDetails.insertUserLicense(obj).subscribe(()=>{
                console.log('User has been allocated  License');
                this.snackBar.open('License allocated to User','Dismiss');
            })
            
            this.swDetails.updateAllocation(lid,'1').subscribe(()=> {
                console.log('Allocation count incremented');
            })
            this.swDetails.updateAvailabeCount(lid,'1').subscribe(()=>{
                console.log('Available count decremented');
            })
           this.checkUser();
            this.openDialog2();
        }
    }
    else {
        alert('User has already Exist.');
    }

 
}


checkUser(){
    // this._softservice.sendMessge('Changed');
    this.shownoUser = false;
    this.showNoData = false;
    this.swDetails.isUserAlloted.next('yes');
  }
  

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.users && this.users.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return null;
  }


ngOnInit() {
    this.swDetails.getusers().subscribe((data) => {
        this.users = data;
        })
        
    this.swDetails.getAlloclicense().subscribe((data) => {
        this.alloclicense = data;
        })
    
    this.swDetails.getUserLicense().subscribe((data) => {
        this.Alluserlicenses = data;
    })
    
        this.filteredOptions = this.allocateForm.controls.user.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.User_Name),
            map(User_Name => User_Name ? this._filter(User_Name) : this.users.slice())
          );


        




this.actrouter.params.subscribe(params =>{
    this.softID = +params['id'];
    this.ptype = params['ptype'];
    console.log("Software Selected is",this.softID);
    if(this.ptype === 'software') {
       this.softwareinfosubscription = this.swDetails.getSoftwareInfo(this.softID).subscribe((data)=>{
            this.softArray = data;
            console.log(this.softArray);
            this.sname = this.softArray[0]['Software_Name'];
            this.pname = this.softArray[0]['Publisher_Name'];
            this.stype = this.softArray[0]['SType_Name'];
            this.ssubtype = this.softArray[0]['SubType_Name'];
            this.scategory = this.softArray[0]['SCategory_Name'];
           
        })


   
        this.licenses = this.swDetails.getSelectedSoftLicen(this.softID).subscribe((branches:any) => {
            console.log(branches);
            for(let i=0; i<branches.length; i++){
                if(branches[i]['active_status']===1){
                    let obj = {
                        Ltype_Name: branches[i]['Ltype_Name'],
                        License_Name: branches[i]['License_Name'],
                        License_Key: branches[i]['License_Key'],
                        expiry_date: new Date(branches[i]['License_Expiry_date'] ).toDateString() ,
                        License_ID: branches[i]['License_ID']
                    }
                    console.log('today is',this.today, 'exp is',obj['expiry_date']);
                    // this.lilist.push(branches[i])
                    this.lilist.push(obj);
                    this.licensenames.push(branches[i]['License_Name'])
                }
                
            }
          
            
            if(this.lilist.length === 0){
                this.nolicenses = true;
            }
            
            this.licenselist = new MatTableDataSource(this.lilist);
            this.licenselist.paginator = this.paginator1;
            
            });
        
          this.uwisubscription=  this.swDetails.getuwi(this.softID).subscribe( data =>{
                this.uwiData = data;
                console.log(this.uwiData);
                
            this.uwiData.forEach((obj) => {
                let arr = {};
                arr["work_name"] = obj["work_name"];
                arr["user_name"] = obj["user_name"];
                arr["license_name"] = obj["license_name"];
                arr["license_key"] = obj["license_key"];
                this.inst.push(arr);
            });

            this.uwiData.forEach((obj) => {
                let arr = {};
                arr["work_name"] = obj["work_name"];
                arr["user_name"] = obj["user_name"];
                arr["server_name"] = obj["server_name"];
                arr["no_of_instal"] = obj["no_of_instal"];
                arr["licen_no_instal"] = obj["licen_no_instal"];
                arr["unlicen_no_instal"] = obj["unlicen_no_instal"];

                this.wst.push(arr);
                
            });
                
                if(this.uwiData.length > 0 ){
                this.installationlist = new MatTableDataSource(this.uwiData);
                this.Userlist = new MatTableDataSource(this.uwiData);
                this.wslist = new MatTableDataSource(this.uwiData);
                this.Userlist.paginator = this.paginator7;
                this.installationlist.paginator = this.paginator2;
                this.wslist.paginator = this.paginator4;
                // this.allocateList = new MatTableDataSource(this.uwiData);

                this.liceninstal = this.uwiData.reduce( (total,item)=>(total = total+item['licen_no_instal']),0);

                console.log(this.liceninstal,"licensen install")

                this.unliceninstal = this.uwiData.reduce((total,item)=>(total = total+item['unlicen_no_instal']),0);

                console.log(this.unliceninstal,"unlicdsdfs ");


                this.totallicen = this.liceninstal + this.unliceninstal;
                }
                else {
                  
                    this.showNoData = true;
                    this.shownoUser = true;
                }

            })


            this.swDetails.getSoftwareHistory(this.softID).subscribe((data)=> {
                this.softhistorydata = data;
                this.softwarehistorylist = new MatTableDataSource(this.softhistorydata);
                this.softwarehistorylist.paginator = this.paginator3;


            })
    }

    else{
      this.softwareinfosubscription =  this.swDetails.getSuiteInfo(this.softID).subscribe((data)=>{
            this.softArray = data;
            this.sname = this.softArray[0]['Software_Suite_Name'];
            this.pname = this.softArray[0]['Publisher_Name'];
            this.stype = this.softArray[0]['SType_Name'];
            this.ssubtype = this.softArray[0]['SubType_Name'];
            this.scategory = this.softArray[0]['SCategory_Name'];
        })
        this.licenses = this.swDetails.getSelectedSuiteLicen(this.softID).subscribe((branches:any) => {
            console.log(branches);
            for(let i=0; i<branches.length; i++){
                if(branches[i]['active_status']===1){
                    this.lilist.push(branches[i])
                }
            }
            
            if(this.lilist.length === 0){
                this.nolicenses = true;
            }
            
            this.licenselist = new MatTableDataSource(this.lilist);
            this.licenselist.paginator = this.paginator1;
            
            });

          this.uwisubscription =  this.swDetails.getssuwi(this.softID).subscribe( data =>{
            this.uwiData.forEach((obj) => {
                let arr = {};
                arr["work_name"] = obj["work_name"];
                arr["user_name"] = obj["user_name"];
                arr["license_name"] = obj["license_name"];
                arr["license_key"] = obj["license_key"];
                this.inst.push(arr);
            });
           
                if(this.uwiData.length > 0){
                    this.installationlist = new MatTableDataSource(this.uwiData);
                    this.Userlist = new MatTableDataSource(this.uwiData);
                    this.wslist = new MatTableDataSource(this.uwiData);
                    this.Userlist.paginator = this.paginator7;
                    this.installationlist.paginator = this.paginator2;
                    this.wslist.paginator = this.paginator4;
                    // this.allocateList = new MatTableDataSource(this.uwiData);
    
                    this.liceninstal = this.uwiData.reduce( (total,item)=>(total = total+item['licen_no_instal']),0);
    
                    console.log(this.liceninstal,"licensen install")
    
                    this.unliceninstal = this.uwiData.reduce((total,item)=>(total = total+item['unlicen_no_instal']),0);
    
                    console.log(this.unliceninstal,"unlicdsdfs ");
    
    
                    this.totallicen = this.liceninstal + this.unliceninstal;
                    }
                    else {
                     
                        this.showNoData = true;
                        this.shownoUser = true;
                    }

                    this.swDetails.getSuiteHistory(this.softID).subscribe((data)=> {
                        this.softhistorydata = data;
                        console.log(this.softhistorydata, 'Suite history')
                        this.softwarehistorylist = new MatTableDataSource(this.softhistorydata);
                        this.softwarehistorylist.paginator = this.paginator3;
                    })


                    
                    
                    
                
            })


    }
})



this.historysubscription = this.swDetails.getHistory().subscribe((data:any)=>{

this.history = data;
console.log(data,'All history');

this.putIn(this.history);

let temparray =[];
let  currentweek = Math.ceil((this.todaysDate.getDate() - 1 - this.todaysDate.getDay()) / 7);
for(let i =0; i<data.length; i++){
    let license_date = new Date(data[i]['Discovered']);
    if( data[i]['install_status'] === 'installed'){
        temparray.push(data[i]);
    }
    // if( license_date.getMonth() === this.todaysDate.getMonth()){
    //     let weekno =  Math.ceil(( new Date(data[i]['Discovered']).getDate() - 1 - new Date(data[i]['data']).getDay()) / 7);
    //     if((weekno === currentweek)){
    //         // this.historyarray.push(data[i]);
    //         temparray.push(data[i]);
    //     } 
    //     if((weekno === currentweek)&& (data[i]['install_status'] === 'installed')){
    //         temparray.push(data[i]);
    //     }     
    // }
}






this.list = new MatTableDataSource(temparray);
this.list.paginator = this.paginator5;
});



}

putIn(somearray){
    this.filteredHistory = somearray;

}



// filteredUsers = [];
// filterUserByAllocation(value){
//     let filterbytype = []
//     if(value !='all'){
//         if(value === 'allocated'){
//             filterbytype = this.uwiData.filter(license=> (license['consume_status'] === 'allocated' ))
//             this.Userlist = new MatTableDataSource(filterbytype);
//         }
//         else if(value === 'consumed'){
//             filterbytype = this.uwiData.filter(license=>(license['consume_status'] === 'consumed'))
//             this.Userlist = new MatTableDataSource(filterbytype);
//         }

//     }
//     else {
//         this.Userlist = new MatTableDataSource(this.filteredUsers);
//     }
  
// }


// filterUser(value){
//     console.log(value);

//     if(value === 'all'){
//         console.log(this.uwiData);
//         this.Userlist = new MatTableDataSource(this.uwiData);
//     }
//     else{
    

//     this.filteredUsers = this.uwiData.filter(license => (license['license_name'] === value));

//     if(this.filteredUsers.length === 0){
//         this.shownoUser = true;
//         // this.Userlist = new MatTableDataSource(this.uwiData);
//     }
//     else {
//         this.shownoUser = false;
//     console.log(this.filteredUsers);

//     this.Userlist = new MatTableDataSource(this.filteredUsers);

//     }

    

//     }


// }



filterByDate(value){
    this.historyarray = [];
    console.log(value);
    let today = new Date();
    let  currentweek = Math.ceil((this.todaysDate.getDate() - 1 - this.todaysDate.getDay()) / 7);
    
    let filteredbyDateArray = new Array();

    if(value === 'week'){
        for(let i = 0; i< this.filteredHistory.length; i++){         
            if(new Date(this.filteredHistory[i]['Discovered']).getMonth()+1 === this.todaysDate.getMonth()+1){
                let weekno =  Math.ceil((new Date(this.filteredHistory[i]['Discovered']).getDate() - 1 - new Date(this.filteredHistory[i]['Discovered']).getDay()) / 7);
                if(weekno === currentweek){
                    filteredbyDateArray.push(this.filteredHistory[i]);
                }     
            }
        }
        console.log(filteredbyDateArray,'weeks history'); 
     
    }
    if(value === 'month'){
        for(let i = 0; i< this.filteredHistory.length; i++){
            if(new Date(this.filteredHistory[i]['Discovered']).getMonth()+1 === this.todaysDate.getMonth()+1){
                filteredbyDateArray.push(this.filteredHistory[i]);     
               
            }
        }
        console.log(filteredbyDateArray,'Month history');
    
    }
    if(value === 'year'){
        for(let i = 0; i< this.filteredHistory.length; i++){   
            if(new Date(this.filteredHistory[i]['Discovered']).getFullYear() === this.todaysDate.getFullYear()){
                filteredbyDateArray.push(this.filteredHistory[i]);
                console.log(filteredbyDateArray,'Mannnn');
            }
    }
    }
    if(value === 'all'){
        for(let i = 0; i< this.filteredHistory.length; i++){      
                filteredbyDateArray.push(this.filteredHistory[i]);       
        }
    }



this.historyarray = filteredbyDateArray;
this.filtHistory();
 
}

goToAdd() {
this.router.navigate(['/addLicense',`${this.ptype}`,`${this.softID}`]);
}

goToUpgrade(id) {
this.router.navigate(['/upgrade',`${this.ptype}`,`${this.softID}`]);
}

goToRenew(id) {
this.router.navigate(['/renew',id]);
}

goToAlloc(id){
    this.router.navigate(['/alloc',id]);
    console.log(id);
  }
  
callHistory(){
    console.log(this.historyarray);
    this.filtHistory();   
}


filtHistory(){
   let filterByStatus = []
    console.log(this.installed, this.uninstalled);
    if(this.installed){
        for(let i =0; i<=this.historyarray.length-1; i++){
             if(this.historyarray[i]['install_status']==='installed'){
                filterByStatus.push(this.historyarray[i])
               }
        }
    }
    if(this.uninstalled){
        for(let i =0; i<=this.historyarray.length-1; i++){
            if(this.historyarray[i]['install_status']==='uninstalled'){
               filterByStatus.push(this.historyarray[i])
              }
       }
    }
    if((!this.installed)&&(!this.uninstalled)){
        filterByStatus = this.historyarray;
    }

    this.list = new MatTableDataSource(filterByStatus);
    this.list.paginator = this.paginator5;

}





installationTable = ['Work_Name', 'User_Name', 'License_Key', 'Ltype_Name', 'License_Name'];

//installationlist = new MatTableDataSource(Installations_data);



userTable = ['User_Name', 'Email_ID', 'Phone_number', 'License_Name'];

// //userList = new MatTableDataSource(Users_data);


// allocateTable = ['User_Name', 'Work_Name', 'Server_Name', 'Email_ID', 'Phone_number'];

// allocateList =  new MatTableDataSource<Alloc>();



workstationTable = ['Work_Name', 'Server_Name', 'User_Name', 'no_of_instal', 'licen_no_instal', 'unlicen_no_instal'];

//wslist = new MatTableDataSource(WS_data);

HistoryTable = ['Discovered', 'Work_Name', 'User_Name','status'];

//historylist = new MatTableDataSource(this.filteredHistory);

SoftwareHistoryTable = ['Uninstallation date', 'Software Name', 'Software Version', 'Installation Date'];

licenseTable = ['licen_type', 'licen_name', 'licen_key', 'actions', 'remove'];


licenselist = new MatTableDataSource<any>();



ngOnDestroy(){
this.softwareinfosubscription.unsubscribe();
// this.suiteinfosubscription.unsubscribe();
this.uwisubscription.unsubscribe();
this.historysubscription.unsubscribe();

}

}