import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonnelService } from 'src/app/services/personnel.service';
import { StringService } from 'src/app/services/string.service';

@Component({
  selector: 'app-add-personnel-dialog',
  templateUrl: './add-personnel-dialog.component.html',
  styleUrls: ['./add-personnel-dialog.component.scss']
})
export class AddPersonnelDialogComponent {

  formGroup = new FormGroup({
    lastName: new FormControl(''),
    job: new FormControl(''),
    salary: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddPersonnelDialogComponent>) { }

  cancel() {
    this.dialogRef.close();
  }
}
