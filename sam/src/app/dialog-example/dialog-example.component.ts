import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { SwDetailsService } from '../sw-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {


  dataid: number;
  licensename: string;
  updatevalue: number;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    private _service:SwDetailsService,
    private _router: Router) { }

  ngOnInit() {
    this.dataid = this.data.licenseid;
    this.licensename = this.data.name;
  
  }

  closeDialog() {
    this._service.deleteLicense(this.dataid,this.data.liobj).subscribe(()=>{
      console.log('License is deleted. Ha!')
    })
    this.dialogRef.close({ event: 'close', data: this.dataid });
    
    }

}
