import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FilterComponent } from '../filter/filter.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwReportsService } from '../sw-reports.service';
import { SwDetailsService } from '../sw-details.service';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit, OnDestroy {
    // showLoadingIndicator = true;

    filterarray = [];
    loading = true;
    totalSoftwares: number;
    filteredtotalSoftwares: number;
    allData: any = [];

    shownoData: boolean = false;
    shownoRiskEntitlement: boolean = false;

    noofOverConsumedLicense = 0;
    percentagOfOverConsumedLicense = 0;
    noOfUnderConsumedLicense = 0;
    percentageOfUnderConsumedLicense = 0;

    totalsoftsubscription: Subscription;
    reportsSubscription: Subscription;


    defauthper = 0;
    defunauthper = 0;
    defunmanper = 0;

    authper = 0;
    unauthper = 0;
    unmanper = 0;
    riskcostarray = [];
    riskentitlementarray = [];
    unlicensedarray = [];

    showDefault: boolean = true;
    showFiltered: boolean = false;


    openDialog() {
        const dialogRef = this.dialog.open(FilterComponent, {
            width: '42%',
            autoFocus: true,
            disableClose: true,
            data: this.filterarray
        })
        dialogRef.afterClosed().subscribe(result => {
            this.filterarray = result.data;
            this.showChanges();
        })
    }


    constructor(

        private dialog: MatDialog,
        private _router: Router,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private _reportservice: SwReportsService,
        private _swService: SwDetailsService) {
        this.matIconRegistry.addSvgIcon(
            'filter_list',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/filter_list.svg')
        )
    }


    setFilterPieChart() {

        let filteredauth = [];
        let filteredunauth = [];
        let unmanaged = [];
        this.filteredSoftwares.forEach((software) => {
            if (software['allocated_license'] != 0) {
                if (software['allocated_license'] <= software['available_count']) {
                    filteredauth.push(software);
                }
            }
        })
        console.log(filteredauth);

        this.filteredSoftwares.forEach((software) => {
            if (software['allocated_license'] > software['available_count']) {
                filteredunauth.push(software);
            }
        })
        console.log(filteredunauth.length);

        this.filteredSoftwares.forEach((software) => {
            if (software['available_count'] === null || (software['allocated_license'] < software['available_count'])) {
                unmanaged.push(software);
            }
        })
        console.log(unmanaged.length);

        this.title6 = `Total no of Softwares are `;
        this.type6 = 'PieChart';
        this.data6 = [
            ['authorized', filteredauth.length],
            ['Unauthorized', filteredunauth.length],
            ['Unmanaged', unmanaged.length]
        ];
        this.columnNames6 = ['Browser', 'Percentage'];
        this.options6 = {
            backgroundColor: '#E6E6FA',
            is3D: true
        };
        this.width6 = 600;
        this.height6 = 380;
    }


    setRiskCost() {

        let riskcostsoftwares = [];



        this.filteredSoftwares.forEach(software => {
            if (software['remaining'] > 0) {
                let costperlicense = software['purchase_cost'] / software['available_count'];
                let riskcost = costperlicense * (software['remaining']);
                let tempArray = new Array();
                tempArray.push(software.Product_Name);
                tempArray.push(Math.round(riskcost));
                riskcostsoftwares.push(tempArray);
            }
        })
        console.log(riskcostsoftwares, ' Risk Cost Softwares');

        if(riskcostsoftwares.length == 0){
            this.shownoData = true;

        }
        else {
            this.shownoData = false;
            this.title7 = 'Licensed Products at risk (in Rs)';
            this.type7 = 'ColumnChart';
            this.data7 = riskcostsoftwares;
            this.columnNames7 = ['Product names', 'cost'];
            this.options7 = {
                backgroundColor: '#E6E6FA',
                hAxis: {
                    direction: -1,
                    slantedText: true,
                    slantedTextAngle: 35 // here you can even use 180
                },
            };
            this.width7 = 600;
            this.height7 = 380;

        }

   

    }


    setRiskEntitlement() {
        let risk_entitlement = [];
        this.filteredSoftwares.forEach(software => {
            if (software['remaining'] > 0) {
                let riskedproducts = software['remaining'];
                let tempArray = new Array();
                tempArray.push(software.Product_Name);
                tempArray.push(riskedproducts);
                risk_entitlement.push(tempArray);
            }
        })

        if(risk_entitlement.length !=0){
            this.shownoRiskEntitlement = false;
            this.title8 = 'Licensed Products at risk Entiltement (in Rs)';
            this.type8 = 'ColumnChart';
            this.data8 = risk_entitlement;
            this.columnNames8 = ['Product names', 'cost'];
            this.options8 = {
                backgroundColor: '#E6E6FA',
                hAxis: {
                    direction: -1,
                    slantedText: true,
                    slantedTextAngle: 35 // here you can even use 180 
                },
            };
            this.width8 = 600;
            this.height8 = 380;

        }
        else{
            this.shownoRiskEntitlement = true;
        }
   

    }

    setProductswithUnlicensedInstallations() {

        let arrayofunlicenseinstallations = [];

        this.filteredSoftwares.forEach(software => {
            if (software['available_count'] === 0) {
                let tempArray = new Array();
                tempArray.push(software.Product_Name);
                tempArray.push(software.installations);
                arrayofunlicenseinstallations.push(tempArray);
            }
        })

        this.title9 = 'No of Installations';
        this.type9 = 'BarChart';
        this.data9 = arrayofunlicenseinstallations;
        this.columnNames9 = ['Product Names', 'installations'];
        this.options9 = {
            backgroundColor: '#E6E6FA',
        };
        this.width9 = 600;
        this.height9 = 380;

    }


    setUnauthorizedApplications() {
        let unauthorizedlicenses = [];
        this.filteredSoftwares.forEach(software => {
            if (software['installations'] > software['allocated_license']) {
                let noofinst = software['installations'] - software['allocated_license'];
                let tempArray = new Array();
                tempArray.push(software.Product_Name);
                tempArray.push(noofinst);
                unauthorizedlicenses.push(tempArray);
            }
        })

        this.title10 = 'Licensed Products at risk Entiltement (in Rs)';
        this.type10 = 'ColumnChart';
        this.data10 = unauthorizedlicenses;
        this.columnNames10 = ['Product names', 'cost'];
        this.options10 = {
            backgroundColor: '#E6E6FA',
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 35 // here you can even use 1100 
            },
        };
        this.width10 = 600;
        this.height10 = 380;

    }

    setPercentages() {
        let total = 0;
        let overconsumedarray = [];
        let underconsumedarray = [];

        let consumedarray = [];
        let available_countarray = [];


        this.filteredSoftwares.forEach(software => {
            if (software['available_count'] > 0) {
                total = total + software['available_count'];
            }

            consumedarray.push(software['allocated_license']);
            available_countarray.push(software['remaining']);

            // if (software['allocated_license'] > software['available_count']) {
            //     overconsumedarray.push(software['allocated_license'] - software['available_count'])
            // }
            // if (software['available_count'] > software['allocated_license']) {
            //     underconsumedarray.push(software['available_count'] - software['allocated_license'])
            // }
        })

        console.log(consumedarray,'Consumed');
        console.log(available_countarray,'Available Count');

        // this.noofOverConsumedLicense = overconsumedarray.reduce((sum, item) => (sum = sum + item), 0);
        // this.noOfUnderConsumedLicense = underconsumedarray.reduce((sum, item) => (sum = sum + item), 0);

        this.noofOverConsumedLicense = consumedarray.reduce((sum, item) => (sum = sum + item), 0);
        this.noOfUnderConsumedLicense = available_countarray.reduce((sum, item) => (sum = sum + item), 0);

        this.percentagOfOverConsumedLicense = Math.round((this.noofOverConsumedLicense / total) * 100);
        this.percentageOfUnderConsumedLicense = Math.round((this.noOfUnderConsumedLicense / total) * 100);

    }








    // countAuthPercentage(): number {
    //     let per = 0;
    //     let sumOfauth = 0;
    //     let sumOfSoft = 0;

    //     let authlicen = this.filteredSoftwares.filter( (item)=> ( item['allocated_license'] === item['available_count'] ))
    //     .filter( item => ( item['allocated_license'] != 0 || item['available_count'] != 0));
    //     console.log('slfjskldjfksdf',authlicen);


    //     this.filteredSoftwares.forEach(function (software) {
    //         // console.log(software['authorized']);  
    //         sumOfauth = sumOfauth + software['authorized'];
    //         sumOfSoft = sumOfSoft + software['authorized'] + software['unauthorized'] + software['unmanaged'];             //1 2 3 4 5 6

    //     });
    //     //   console.log(sumOfauth);
    //     //   console.log(sumOfSoft);
    //     per = (sumOfauth / sumOfSoft) * 100;


    //     let res = Math.round(per);
    //     return res;
    // }


    // countUnauthPercentage(): number {
    //     let per2 = 0;
    //     let sumOfunauth = 0;
    //     let sum1 = 0;
    //     this.filteredSoftwares.forEach(function (value) {
    //         // console.log(value['unauthorized']); 
    //         sumOfunauth = sumOfunauth + value['unauthorized'];
    //         sum1 = sum1 + value['authorized'] + value['unauthorized'] + value['unmanaged'];             //1 2 3 4 5 6

    //     });
    //     per2 = (sumOfunauth / sum1) * 100;
    //     // console.log(sumOfunauth);
    //     // console.log(sum1);

    //     let res2 = Math.round(per2);
    //     return res2;
    // }

    // countunManPercentage(): number {
    //     let per3 = 0;
    //     let sumOfunman = 0;
    //     let sum2 = 0;
    //     this.filteredSoftwares.forEach(function (value) {
    //         // console.log(value['unmanaged']); 
    //         sumOfunman = sumOfunman + value['unmanaged'];
    //         sum2 = sum2 + value['authorized'] + value['unauthorized'] + value['unmanaged'];             //1 2 3 4 5 6

    //     });
    //     per3 = (sumOfunman / sum2) * 100;
    //     // console.log(sumOfunman);
    //     // console.log(sum2);

    //     let res3 = Math.round(per3);
    //     return res3;
    // }

    // putRiskCost() {
    //     let newArray = new Array();
    //     this.filteredSoftwares.forEach(function (value) {
    //         let tempArray = new Array();

    //         tempArray.push(value['Product_Name']);
    //         tempArray.push(value['risk_cost']);
    //         // this.riskcostarray.push(tempArray); 
    //         newArray.push(tempArray);
    //         console.log(tempArray);

    //     });

    //     return newArray;
    // }

    // putRiskEntitlementCost() {
    //     let newArray = new Array();
    //     this.filteredSoftwares.forEach(function (value) {
    //         let tempArray = new Array();

    //         tempArray.push(value['Product_Name']);
    //         tempArray.push(value['risk_entitlement']);
    //         // this.riskcostarray.push(tempArray); 
    //         newArray.push(tempArray);


    //     });

    //     return newArray;

    // }

    // putUnlicensedInstalltations() {
    //     let newArray = new Array();
    //     this.filteredSoftwares.forEach(function (value) {
    //         let tempArray = new Array();

    //         tempArray.push(value['Product_Name']);
    //         tempArray.push(value['unlicensed_inst']);
    //         // this.riskcostarray.push(tempArray); 
    //         newArray.push(tempArray);

    //     });

    //     return newArray;

    // }



    title;
    type = 'PieChart';
    data = [['a',0]];
    columnNames;
    options;
    width;
    height;

    title4;
    type4 = 'BarChart';
    data4 = [['a',0]];
    columnNames4;
    options4;
    width4;
    height4;

    title5;
    type5 = 'ColumnChart';
    data5 = [['a',0]];
    columnNames5;
    options5;
    width5;
    height5;


    title2;
    type2 = 'ColumnChart';
    data2 = [['a',0]];
    columnNames2;
    options2;
    width2;
    height2;

    title3;
    type3 = 'ColumnChart';
    data3 = [['a',0]];
    columnNames3;
    options3;
    width3;
    height3;

    title6;
    type6 = 'PieChart';
    data6 = [[]];
    columnNames6;
    options6;
    width6;
    height6;


    title7;
    type7 = 'ColumnChart';;
    data7 = [0,0];
    columnNames7;
    options7;
    width7;
    height7;


    title8;
    type8 = 'ColumnChart';
    data8 = [0,0];
    columnNames8;
    options8;
    width8;
    height8;

    title9;
    type9 = 'BarChart';
    data9 = [];
    columnNames9;
    options9;
    width9;
    height9;


    title10;
    type10 = 'ColumnChart';
    data10 = [];
    columnNames10;
    options10;
    width10;
    height10;




    filteredSoftwares: any = new Set();

    showChanges() {
        
        if(this.filterarray.length === 0){
            this.showDefault = true;
            this.showFiltered = false;
        }
        else{
            this.showDefault = false;
            this.showFiltered = true;
            this.filteredSoftwares = new Set();
    
            for (let i = 0; i <= this.filterarray.length - 1; i++) {
                for (let j = 0; j <= this.allData.length - 1; j++) {
                    if ((this.filterarray[i] === this.allData[j]['Publisher_Name']) || (this.filterarray[i] === this.allData[j]['SType_Name']) ||
                        (this.filterarray[i] === this.allData[j]['SCategory_Name']) || (this.filterarray[i] === this.allData[j]['SubType_Name']) || (this.filterarray[i] === this.allData[j]['Ltype_Name'])) {
                        this.filteredSoftwares.add(this.allData[j]);
                    }
                }
            }
    
            console.log(this.filteredSoftwares);
    
            this.setFilterPieChart();
            this.setRiskCost();
            this.setRiskEntitlement();
            this.setProductswithUnlicensedInstallations();
            this.setUnauthorizedApplications();
            this.setPercentages();
    

        }
     

        // this.authper = this.countAuthPercentage();
        // this.unauthper = this.countUnauthPercentage();
        // this.unmanper = this.countunManPercentage();
        // this.riskcostarray = this.putRiskCost();
        // this.riskentitlementarray = this.putRiskEntitlementCost();
        // this.unlicensedarray = this.putUnlicensedInstalltations();






    }


    showDefaultReports() {
        this.totalsoftsubscription = this._reportservice.getTotalSoftwares().subscribe((data) => {
            this.totalSoftwares = data[0]['sum(ts.totalsoftwares)'];
            this.title = 'Total no of Softwares: ' + this.totalSoftwares;
        });

        this.reportsSubscription = this._reportservice.getAllData().subscribe((data) => {
            this.allData = data;
            console.log(this.allData, 'All Data');
            let defaultauth = this.allData.filter((item) => {
                if ((item['available_count'] !== 0) || item['allocated_license'] !== 0) {
                    if (item['allocated_license'] <= item['available_count']) {
                        return item;
                    }
                    // return item['available_count'] === item['allocated_license']
                }
            });


            let defaultunauth = this.allData.filter((item) => (item['available_count'] < item['allocated_license']))
            let unman = this.allData.filter((item) => ( (item['available_count'] === null) ||  (item['allocated_license'] < item['available_count'])))

            this.defauthper = defaultauth.length / (defaultauth.length + defaultunauth.length + unman.length) * 100;
            this.defunauthper = defaultunauth.length / (defaultauth.length + defaultunauth.length + unman.length) * 100;
            this.defunmanper = unman.length / (defaultauth.length + defaultunauth.length + unman.length) * 100;

            this.data = [
                ['authorized', defaultauth.length],
                ['unauthorized', defaultunauth.length],
                ['Unmanaged', unman.length]
            ]

            // this.data = [
            //     ['authorized', Math.round(this.defauthper)],
            //     ['Unauthorized', Math.round(this.defunauthper)],
            //     ['Unmanaged', Math.round(this.defunmanper)]
            // ];

            let uniquesoftwares = [];
            this.allData.filter(item => ((item['available_count'] > 0)))
                .filter(element => (element['remaining'] > 0))
                .forEach((softobj) => {
                    let costperlicense = softobj['purchase_cost'] / softobj['available_count'];
                    let riskcost = costperlicense * (softobj['remaining']);
                    let tempArray = new Array();
                    tempArray.push(softobj.Product_Name);
                    tempArray.push(Math.round(riskcost));
                    uniquesoftwares.push(tempArray);
                });

            let sorted =uniquesoftwares.sort((a,b) => {
                return   b[1] - a[1];
            })

            console.log('Sorted Array bro',sorted);
            
            this.data2 = sorted.slice(0,10);

            let graph3data = [];
            this.allData.filter(item => ((item['remaining'] > 0))).
                forEach(item => {
                    let riskedproducts = item['remaining'];
                    let tempArray = new Array();
                    tempArray.push(item.Product_Name);
                    tempArray.push(riskedproducts);
                    graph3data.push(tempArray);
                })
            
            let sortedgraph3 = graph3data.sort((a,b) => {
                return b[1] - a[1];
            })


            this.data3 = sortedgraph3.slice(0,10);


            let totallicenses = this.allData.filter(item => (item['available_count'] > 0))
                .reduce((total, item) => (total = total + item['available_count']), 0);


                this.noofOverConsumedLicense = this.allData.reduce((total, item) => (total + item['allocated_license']),0);
                this.noOfUnderConsumedLicense = this.allData.reduce((total,item) => (total + item['remaining']),0);


            // this.noofOverConsumedLicense = this.allData.filter(item => (item['allocated_license'] > item['available_count']))
            //     .map(item => (item['allocated_license'] - item['available_count']))
            //     .reduce((total, item) => (total = total + item), 0);

            this.percentagOfOverConsumedLicense = Math.round(this.noofOverConsumedLicense / totallicenses * 100);

            // this.noOfUnderConsumedLicense = this.allData.filter(item => (item['available_count'] > item['allocated_license']))
            //     .map(item => (item['available_count'] - item['allocated_license']))
            //     .reduce((total, item) => (total = total + item), 0);
            this.percentageOfUnderConsumedLicense = Math.round(this.noOfUnderConsumedLicense / totallicenses * 100);


            let arrayofunlicenseinstallations = [];

            this.allData.filter(item => (item['available_count'] === null))
                .forEach(item => {
                    let tempArray = new Array();
                    tempArray.push(item.Product_Name);
                    tempArray.push(item.installations);
                    arrayofunlicenseinstallations.push(tempArray);
                })

                let sortedunlicen  = arrayofunlicenseinstallations.sort((a,b) => {
                    return b[1] - a[1];
                })

            this.data4 = sortedunlicen.slice(0,5);

            let unauthorizedlicenses = [];
            this.allData.filter(item => (item['installations'] > item['allocated_license']))
                .forEach(item => {
                    let noofinst = item['installations'] - item['allocated_license'];
                    let tempArray = new Array();
                    tempArray.push(item.Product_Name);
                    tempArray.push(noofinst);
                    unauthorizedlicenses.push(tempArray);
                })
                let sortedunauth  = unauthorizedlicenses.sort((a,b) => {
                    return b[1] - a[1];
                })

            

            this.data5 = unauthorizedlicenses.slice(0,5);

        })
        this.type = 'PieChart';
        this.columnNames = ['Browser', 'Percentage'];
        this.options = {
            backgroundColor: '#E6E6FA',
            is3D: true
        };
        this.width = 600;
        this.height = 380;


        this.title2 = 'Licensed Products at risk (in Rs)';
        this.type2 = 'ColumnChart';
        // this.data2 = [
        //     ["photoshop", 100],
        //     ["windows 10", 40],
        //     ["oracle 11g", 120],
        //     ["corel draw", 60],
        //     ["ms office", 75]
        // ];
        this.columnNames2 = ['Product names', 'cost'];
        this.options2 = {
            backgroundColor: '#E6E6FA',
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 35 // here you can even use 180
            },
            is3D: true
        };
        this.width2 = 600;
        this.height2 = 380;


        this.title3 = 'Licensed Products at risk entitlement (in Rs)';
        this.type3 = 'ColumnChart';
        // this.data3 = [
        //     ["tally", 10],
        //     ["SAP", 50],
        //     ["MS Office", 30],
        //     ["Photoshop", 15],
        //     ["Oracle 12g", 28]
        // ];
        this.columnNames3 = ['Product names', 'no of softwares unused'];
        this.options3 = {
            backgroundColor: '#E6E6FA',
            colors: ['#f3b49f', '#f6c7b6'],
            hAxis: {
                title: 'Softwares',
                direction: -1,
                slantedText: true,
                slantedTextAngle: 35 // here you can even use 180
            }
        };
        this.width3 = 600;
        this.height3 = 380;


        this.title4 = 'Products with most unlicensed Installations';
        this.type4 = 'BarChart';
        // this.data4 = [
        //     ["Adobe Flash", 200],
        //     ["Windows Player", 150],
        //     ["Oracle 13g", 26],
        //     ["Nero", 256],
        //     ["Microsoft 360", 167]
        // ];
        this.columnNames4 = ['Product Names', 'installations'];
        this.options4 = {
            backgroundColor: '#E6E6FA',
        };
        this.width4 = 600;
        this.height4 = 380;



        this.title5 = 'No of Unauthorized Installations';
        this.type5 = 'ColumnChart';
        // this.data5 = [
        //     ["Apache", 50, 70, 60],
        //     ["Adobe", 30, 50, 40],
        //     ["Oracle 11g", 30, 10, 30],
        //     ["Windows 10", 90, 40, 65],
        //     ["Adobe Premier", 15, 30, 45]
        // ];
        this.columnNames5 = ['Product Names', 'number of unauthorized installations'];
        this.options5 = {
            backgroundColor: '#E6E6FA',
            hAxis: {
                title: 'Softwares',
                direction: -1,
                slantedText: true,
                slantedTextAngle: 35
            },

            vAxis: {
                title: 'no of installations'
            },
            seriesType: 'bars',
            series: { 2: { type: 'line' } }
        };
        this.width5 = 600;
        this.height5 = 380;


    }





    ngOnInit() {

        this.showDefaultReports();



        // console.log(data)

    }

    ngOnDestroy() {
        this.totalsoftsubscription.unsubscribe();
        this.reportsSubscription.unsubscribe();

    }
}






