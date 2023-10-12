import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import AddpinService from '../addpin.service';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {
  myForm!: FormGroup;
  locations: any;
  locationForm: any;

  constructor(private fb: FormBuilder,
     private dialogRef: MatDialogRef<MyDialogComponent>,
     private addpin: AddpinService,
) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name:['',Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', [Validators.required,]]
    });
  }

  closeDialog() {
    this.dialogRef.close(this.myForm.value)
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.addpin.addPinLocation(this.locationForm.value)
    }

  }

}
