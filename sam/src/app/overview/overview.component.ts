import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit, OnDestroy {

  licenseSubscriptions: Subscription;
  secondSubscriptions: Subscription;
  allData: any = [];

  totalunused: number;
  totaloverused: number;

  charts: string[] = ['Overused', 'Underused', 'Compliance'];
  title = 'Licensed vs Unlicensed';
  type = 'LineChart';
  data = [[0,0,0]];
  // data = [
  //   ["Jan", 7.0, -0.2],
  //   ["Feb", 6.9, 0.8],
  //   ["Mar", 9.5, 5.7],
  //   ["Apr", 14.5, 11.3],
  //   ["May", 18.2, 17.0],
  //   ["Jun", 21.5, 22.0],
  //   ["Jul", 25.2, 24.8],
  //   ["Aug", 26.5, 24.1],
  //   ["Sep", 23.3, 20.1],
  //   ["Oct", 18.3, 14.1],
  //   ["Nov", 13.9, 8.6],
  //   ["Dec", 9.6, 2.5]
  // ];

  columnNames = ["Year", "Licensed", "Unlicensed"];
  options = {
    hAxis: {
      title: 'Year',
      direction: 1,
      slantedText: true,
      slantedTextAngle: 35
    },
    vAxis: {
      title: 'Licensed vs Unlicensed'
    },
    colors: ["#a52714", "#0000ff", "#ff0000", "#00ff00"]
  };
  width = 800;
  height = 500;



  title1 = 'Overused License';
  type_1 = 'PieChart';
  data_1: any = [];
  // data_1 = [
  // // ['GNU', 45.0],
  // // ['Proprietary', 45.0],
  // // ['Perpetual', 10.0]
  // ];
  columnNames_1 = ['Licensed_overused', 'Percentage'];
  options_1 = {
    is3D: true
  };
  width_1 = 500;
  height_1 = 300;



  title2 = 'Underused License';
  type_2 = 'PieChart';
  data_2: any = [];
  // data_2 = [
  // ['Workstation', 40.0],
  // ['Concurrent', 60.0]
  // ];
  columnNames_2 = ['Licensed_underused', 'Percentage'];
  options_2 = {
    is3D: true
  };
  width_2 = 500;
  height_2 = 300;





  title3 = 'Compliance License';
  type_3 = 'PieChart';
  data_3: any = [];
  // data_3 = [
  // ['Site', 55.0],
  // ['EULA', 45.0]
  // ];
  columnNames_3 = ['Licensed_overused', 'Percentage'];
  options_3 = {
    is3D: true
  };
  width_3 = 500;
  height_3 = 300;
  licenses = [];



  constructor(public dialog: MatDialog,
    private router: Router,
    private swDetails: SwDetailsService,
    private http: HttpClient,
  ) { }

  ngOnInit() {

    this.licenseSubscriptions = this.swDetails.getLicen().subscribe((data) => {
      this.allData = data;

      let overusedlicense = new Map();
      let underusedlicense = new Map();
      let compliantlicense = new Map();

      this.allData.filter(license => (license['allocated_license'] > license['available_count']))
        .forEach(license => {
          let count = 1;
          if (overusedlicense.has(license['Ltype_Name'])) {
            let sum = overusedlicense.get(license['Ltype_Name']);
            // console.log("MAtch Found", sum);
            overusedlicense.set(license['Ltype_Name'], sum + 1);
          }
          else {
            overusedlicense.set(license['Ltype_Name'], count);

          }
        })
      this.data_1 = overusedlicense;

      this.allData.filter(license => (license['available_count'] > license['allocated_license']))
        .forEach(license => {
          let count = 1;
          if (underusedlicense.has(license['Ltype_Name'])) {
            let sum = underusedlicense.get(license['Ltype_Name']);
            // console.log("MAtch Found", sum);
            underusedlicense.set(license['Ltype_Name'], sum + 1);
          }
          else {
            underusedlicense.set(license['Ltype_Name'], count);
          }
        })
      this.data_2 = underusedlicense;

      this.allData.filter(license => (license['available_count'] === license['allocated_license']))
        .forEach(license => {
          let count = 1;
          if (compliantlicense.has(license['Ltype_Name'])) {
            let sum = compliantlicense.get(license['Ltype_Name']);
            // console.log("MAtch Found", sum);
            compliantlicense.set(license['Ltype_Name'], sum + 1);
          }
          else {
            compliantlicense.set(license['Ltype_Name'], count);
          }
        })
      this.data_3 = compliantlicense;



      this.totalunused = this.allData.filter(license => (license['available_count'] > license['allocated_license']))
        .map(license => (license['available_count'] - license['allocated_license']))
        .reduce((total, count) => (total = total + count), 0);

      this.totaloverused = this.allData.filter(license => (license['available_count'] < license['allocated_license']))
        .map(license => (license['allocated_license'] - license['available_count']))
        .reduce((total, count) => (total = total + count), 0);


    })


    this.secondSubscriptions = this.swDetails.licensedvsunlicensed().subscribe(data => {

      let softwares: any = [];
      softwares = data;

      // softwares.forEach(item =>{
      //   console.log(item);
      // })

      function uniqueValues(value, index, self) {
        return self.indexOf(value) === index;
      }
      let inst_dates = softwares.map(item => new Date(item['installation_date']).getFullYear())
        .filter(uniqueValues);
      console.log(inst_dates, 'All years');

      let licensedmap = new Map();
      let Unlicensedmap = new Map();

      inst_dates.forEach(year => {
        for (let i in softwares) {
          let softyear = new Date(softwares[i]['installation_date']).getFullYear();
          if (softyear === year) {
            if (softwares[i]['license_id'] === null) {
              if (Unlicensedmap.has(year)) {

                Unlicensedmap.set(year, Unlicensedmap.get(year) + softwares[i]['installations'])
              }
              else {
                Unlicensedmap.set(year, softwares[i]['installations']);
              }

            }
            else {
              if (licensedmap.has(year)) {
                licensedmap.set(year, licensedmap.get(year) + softwares[i]['installations'])
              }
              else {
                licensedmap.set(year, softwares[i]['installations']);
              }
            }
          }
          // console.log(softwares[i]['installations']);
        }
      })

      let datarray = [];

      inst_dates.forEach( year => {
        let temparray = new Array();
        temparray.push(parseInt(year));
        (licensedmap.has(parseInt(year))? temparray.push(licensedmap.get(parseInt(year))): temparray.push(0));
        (Unlicensedmap.has(parseInt(year))? temparray.push(Unlicensedmap.get(parseInt(year))): temparray.push(0));
        datarray.push(temparray);
      })

      // datarray.map(year => {
      //   parseInt(year[0]);
      //   parseInt(year[1]);
      //   parseInt(year[2]);
      // })
      
      console.log(datarray);
      this.data = datarray;

      // console.log(licensedmap,'LicensedMap');
      // console.log(Unlicensedmap,'UnlicensedMap');
      // console.log(datarray);

    })










      // let inst_dates = softwares.filter( (item)=> ( item))

   




  }

  ngOnDestroy() {
    this.licenseSubscriptions.unsubscribe();
    this.secondSubscriptions.unsubscribe();



  }




}
