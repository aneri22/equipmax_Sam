import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';

export interface Element1 {
  Product_Name: string;
  License_Name: string;
  License_Key: string;
  License_Type: string;
  Expiry_Date:string;
}
const ELEMENT_DATA1: Element1[] = [
  {
    Product_Name: "Blender",
    License_Name: "Blender",
    License_Key: "121hgshd1",
    License_Type: "GNU General Public License",
    Expiry_Date:"2020-01-24"

  },
  {
    Product_Name: "WinRar",
    License_Name: "WinRar",
    License_Key: "H78*&HGH",
    License_Type: "EULA",
    Expiry_Date:"2020-01-26"

  },
  {
    Product_Name: "WaveMaker",
    License_Name: "Apache License",
    License_Key: "878H6%*0",
    License_Type: "EULA",
    Expiry_Date:"2020-01-24"
  },
  {
    Product_Name: "MindPlay",
    License_Name: "MindPlay",
    License_Key: "7HJG753$",
    License_Type: "GNU General Public License",
    Expiry_Date:"2020-01-30"
    
  },
  {
    Product_Name: "Tally ERP 9",
    License_Name: "ERP 9 License",
    License_Key: "%768HJ4K",
    License_Type: "Private(Single User)License",
    Expiry_Date:"2020-01-29"
    
  },
  
];
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})


export class NotificationComponent implements OnInit {
 
  constructor() { }

    p: number = 1;
    collection: any[] = [{
      'name': 'Adobe',
      'expiry': 8,
      'read': true
      
    },
    {
      'name': 'Oracle',
      'expiry': 5,
      'read': false
      
    },
    {
      'name': 'Microsoft',
      'expiry': 2,
      'read': true
      
    },
    {
      'name': 'Java',
      'expiry': 19,
      'read': true
      
    },
    {
      'name': 'Sql',
      'expiry': 30,
      'read': false
      
    },
    {
      'name': 'Photoshop',
      'expiry': 15,
      'read': true
      
    },
    {
      'name': 'Apache',
      'expiry': 10,
      'read': true
      
    },
    {
      'name': 'Qickheal',
      'expiry': 8,
      'read': false
      
    },
    {
      'name': 'Nortaon',
      'expiry': 12,
      'read': false
      
    },
    {
      'name': 'Oracle',
      'expiry': 5,
      'read': false
      
    },
    {
      'name': 'Oracle',
      'expiry': 5,
      'read': false
      
    },
    {
      'name': 'Oracle',
      'expiry': 5,
      'read': false
      
    }

  ];

  ngOnInit() {
  }

}
