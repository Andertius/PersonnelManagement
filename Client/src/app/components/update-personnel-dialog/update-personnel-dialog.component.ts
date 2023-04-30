import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personnel } from 'src/app/models/personnel';

@Component({
  selector: 'app-update-personnel-dialog',
  templateUrl: './update-personnel-dialog.component.html',
  styleUrls: ['./update-personnel-dialog.component.scss']
})
export class UpdatePersonnelDialogComponent {

  personnel: Personnel;

  formGroup = new FormGroup({
    lastName: new FormControl(''),
    job: new FormControl(''),
    salary: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<UpdatePersonnelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personnel) {
      this.personnel = data;
      this.formGroup.controls["lastName"].setValue(this.personnel.lastName);
      this.formGroup.controls["job"].setValue(this.personnel.job);
      this.formGroup.controls["salary"].setValue(this.personnel.salary);
      this.formGroup.controls["dateOfBirth"].setValue(this.personnel.dateOfBirth);
  }

  cancel() {
    this.dialogRef.close();
  }

}
