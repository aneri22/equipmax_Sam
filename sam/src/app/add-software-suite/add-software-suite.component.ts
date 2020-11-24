import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-software-suite',
  templateUrl: './add-software-suite.component.html',
  styleUrls: ['./add-software-suite.component.scss']
})
export class AddSoftwareSuiteComponent implements OnInit {
  addsoftwaresuite: FormGroup;
  myControl = new FormControl();


  constructor(private fb: FormBuilder ) {
    this.addsoftwaresuite =this.fb.group({
      suite_name:['',Validators.required],
      version:['',Validators.required],
      Software_category:['',Validators.required],
      manufacturer_name:['',Validators.required],
      Software_Type:['',Validators.required],
      Software_subtype:['',Validators.required]
    })
   }
   

  ngOnInit() {
  }

}
