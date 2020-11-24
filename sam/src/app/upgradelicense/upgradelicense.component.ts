import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { SwDetailsService } from '../sw-details.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upgradelicense',
  templateUrl: './upgradelicense.component.html',
  styleUrls: ['./upgradelicense.component.scss']
})
export class UpgradelicenseComponent implements OnInit {


  upgradeForm: FormGroup;
  softwareTypes: any = [];
  softwareSubtypes: any = [];
  softwareCategory: any = [];
  software_info = {};
  submitted = false;
  newSoftwares: any = [];
  softID: number;
  softwareOject = {};
  ptype: string;
  newSuite: any = [];
  suiteObject = {};
  suiteID: number;
  sname: string;
  pname: string;
  stype: string;
  ssubtype: string;
  scategory: string;
  oldversion: number;
  oldinstalldate: Date;

  constructor(
    private fb: FormBuilder,
    private _softservice: SwDetailsService,
    private _route: Router,
    private _activeroute: ActivatedRoute
  ) {
    this.upgradeForm = this.fb.group({
      manufacturer_name: ["", Validators.required],

      version: ["", Validators.required],

      new_software: ["", Validators.required],

      publisher: ["", Validators.required],

      installations: ["", Validators.required],

      software_type: ["", Validators.required],

      subtype: ["", Validators.required],

      category: ["", Validators.required],

      // Description: [""],
    });
  }

  goBack() {
    this._route.navigate(["/license/", `${this.ptype}`, `${this.softID}`]);
  }



  changeVersion(value){
    console.log(value);
    if(this.ptype ==='software'){
      for(let i = 0; i<this.newSoftwares.length; i++){
        if(this.newSoftwares[i]['software_name'] === value){
          console.log(this.newSoftwares[i]);
              this.upgradeForm.patchValue(
                {
                  version: this.newSoftwares[i]['software_Version']
                }
              )
            }
      }

    }
    else{
      for(let i = 0; i<this.newSoftwares.length; i++){
        if(this.newSoftwares[i]['software_name'] === value){
          console.log(this.newSoftwares[i]);
              this.upgradeForm.patchValue(
                {
                  version: this.newSoftwares[i]['Software_Suite_Version']
                }
              )
            }
      }

    }
 
  }


  updateSType() {
    if (this.stype === this.upgradeForm.controls["software_type"].value) {
      for (let i = 0; i < this.softwareTypes.length; i++) {
        if (this.softwareTypes[i]["SType_Name"] === this.stype) {
          return this.softwareTypes[i]["SType_ID"];
        }
      }
    } else {
      return this.upgradeForm.controls["software_type"].value;
    }
  }
  updateCategory() {
    if (this.scategory === this.upgradeForm.controls["category"].value) {
      for (let i = 0; i < this.softwareCategory.length; i++) {
        if (this.softwareCategory[i]["SCategory_Name"] === this.scategory) {
          return this.softwareCategory[i]["SCategory_ID"];
        }
      }
    } else {
      return this.upgradeForm.controls["category"].value;
    }
  }
  updateSubtype() {
    if (this.ssubtype === this.upgradeForm.controls["subtype"].value) {
      for (let i = 0; i < this.softwareSubtypes.length; i++) {
        if (this.softwareSubtypes[i]["SubType_Name"] === this.ssubtype) {
          return this.softwareSubtypes[i]["SubType_ID"];
        }
      }
    } else {
      return this.upgradeForm.controls["subtype"].value;
    }
  }

  submitUpgradeForm() {
    // console.log(this.upgradeForm.value);
    let sname = this.upgradeForm.controls["new_software"].value;
    let vname = this.upgradeForm.controls["version"].value;

    if (this.ptype === "software") {
      let updatedSoftware = {
        Product_Name: sname,
        Software_Type: this.updateSType(),
        Subtype: this.updateSubtype(),
        Software_Category: this.updateCategory(),
        Publisher_Name: this.upgradeForm.controls["publisher"].value,
        Manufacturer_Name: this.upgradeForm.controls["manufacturer_name"].value,
        Version: vname,
        Installations: this.upgradeForm.controls["installations"].value,
      };

      console.log(updatedSoftware, "After submit");
      //     // console.log(this.upgradeForm.value,'from form');

      this._softservice
        .upgradeSoftware(this.softID, updatedSoftware)
        .subscribe(() => {
          console.log("New Software has been created");
        });

      //insert into old software
      let oldsoftObj = {
        osname: this.sname,
        oversion: this.oldversion,
        oinstalldate: this.oldinstalldate,
        sid: this.softID,
      };

      this._softservice.postOldSoftware(oldsoftObj).subscribe(() => {
        console.log("Old software has been inserted");
      });
      this._route.navigate(["/license/", `${this.ptype}`, `${this.softID}`]);
      alert("License has been upgraded successfully");
    } else {
      let updatedSuite = {
        Product_Name: sname,
        Software_Type: this.updateSType(),
        Subtype: this.updateSubtype(),
        Software_Category: this.updateCategory(),
        Publisher_Name: this.upgradeForm.controls["publisher"].value,
        Manufacturer_Name: this.upgradeForm.controls["manufacturer_name"].value,
        Version: vname,
        Installations: this.upgradeForm.controls["installations"].value,
      };

      console.log(updatedSuite, "After submit");
      //     // console.log(this.upgradeForm.value,'from form');

      this._softservice
        .upgradeSuite(this.softID, updatedSuite)
        .subscribe(() => {
          console.log("New Suite has been created");
        });

      //insert into old software
      let oldsoftObj = {
        osname: this.sname,
        oversion: this.oldversion,
        oinstalldate: this.oldinstalldate,
        sid: this.softID,
      };

      this._softservice.postOldSuite(oldsoftObj).subscribe(() => {
        console.log("Old software has been inserted");
      });
      this._route.navigate(["/license/", `${this.ptype}`, `${this.softID}`]);
      alert("License has been upgraded successfully");
    }
  }

  ngOnInit() {
    this._softservice.getSTypes().subscribe((data) => {
      this.softwareTypes = data;
    });

    this._softservice.getSubTypes().subscribe((data) => {
      this.softwareSubtypes = data;
    });

    this._softservice.getSCategory().subscribe((data) => {
      this.softwareCategory = data;
    });

    this._activeroute.params.subscribe((params) => {
      this.softID = +params["id"];
      this.ptype = params["ptype"];
      if (this.ptype === "software_suite") {
        this._softservice.getSuiteInfo(this.softID).subscribe((data) => {
          this.software_info = data;
          console.log(this.software_info, "Software info");
          this.sname = this.software_info[0]["Software_Suite_Name"];
          this.oldversion = this.software_info[0]["Software_Suite_Version"];
          this.oldinstalldate = this.software_info[0]["Installation_Date"];
          this.stype = this.software_info[0]["SType_Name"];
          this.ssubtype = this.software_info[0]["SubType_Name"];
          this.scategory = this.software_info[0]["SCategory_Name"];
          this.upgradeForm.patchValue({
            manufacturer_name: this.software_info[0]["Manufacturer_Name"],
            version: this.software_info[0]["Software_Suite_Version"],
            publisher: this.software_info[0]["Publisher_Name"],
            installations: this.software_info[0]["installations"],
            software_type: this.stype,
            subtype: this.ssubtype,
            category: this.scategory,
          });
          this._softservice.getNewSuite(this.softID).subscribe((data) => {
            this.newSoftwares = data;
          });
        });
      } else {
        this._softservice.getSoftwareInfo(this.softID).subscribe((data) => {
          this.software_info = data;
          console.log(this.software_info, "Software info");
          this.sname = this.software_info[0]["Software_Name"];
          this.oldversion = this.software_info[0]["Software_Version"];
          this.oldinstalldate = this.software_info[0]["Installation_Date"];
          this.stype = this.software_info[0]["SType_Name"];
          this.ssubtype = this.software_info[0]["SubType_Name"];
          this.scategory = this.software_info[0]["SCategory_Name"];
          this.upgradeForm.patchValue({
            manufacturer_name: this.software_info[0]["Manufacturer_Name"],
            version: this.software_info[0]["Software_Version"],
            publisher: this.software_info[0]["Publisher_Name"],
            installations: this.software_info[0]["installations"],
            software_type: this.stype,
            subtype: this.ssubtype,
            category: this.scategory,
          });
          this._softservice.getNewSofwares(this.softID).subscribe((data) => {
            this.newSoftwares = data;
          });
        });
      }
    });
  }

  
  
  }