import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Personnel } from 'src/app/models/personnel';
import { PersonnelService } from 'src/app/services/personnel.service';
import { SearchService } from 'src/app/services/search.service';
import { StringService } from 'src/app/services/string.service';
import { AddPersonnelDialogComponent } from '../add-personnel-dialog/add-personnel-dialog.component';
import { FormGroup } from '@angular/forms';
import { UpdatePersonnelDialogComponent } from '../update-personnel-dialog/update-personnel-dialog.component';
import { UpdatePersonnelRequest } from 'src/app/models/requests/updatePersonnelRequest';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  sortOptions = [
    {value: 'lastName', label: 'Last Name'},
    {value: 'job', label: 'Job'},
    {value: 'salary', label: 'Salary'},
    {value: 'dateOfBirth', label: 'Date Of Birth'},
  ];

  selectedOption: string = "lastName";
  personnel: Personnel[] = [];
  subscription: Subscription;

  displayedColumns: string[] = ['lastName', 'job', 'salary', 'dateOfBirth', 'update', 'delete'];

  constructor(
    private readonly personnelService: PersonnelService,
    private readonly stringService: StringService,
    private readonly dialog: MatDialog,
    searchService: SearchService) { 
      this.subscription = searchService.search$
        .subscribe(personnel => this.personnel = personnel.sort((left, right) => this.stringService.compare(left, right, this.selectedOption)));
    }

  ngOnInit(): void {
    this.personnelService.fetchPersonnelByName(null)
      .subscribe(response => this.personnel = response.sort((left, right) => this.stringService.compare(left, right, this.selectedOption)))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resort() {
    this.personnelService.fetchPersonnelByName(null)
      .subscribe(response => this.personnel = response.sort((left, right) => this.stringService.compare(left, right, this.selectedOption)))
  }

  add() {
    const dialogRef = this.dialog.open(AddPersonnelDialogComponent, {
      width: '450px',
    });

    dialogRef
      .afterClosed()
      .subscribe((result: FormGroup) => {
        if (result !== undefined) {
          this.personnelService.addPersonnel({
              lastName: result.controls["lastName"].value,
              job: result.controls["job"].value,
              salary: result.controls["salary"].value,
              dateOfBirth: result.controls["dateOfBirth"].value
            })
            .subscribe(_ => {
              this.personnelService.fetchPersonnelByName(null)
                .subscribe(response => this.personnel = response.sort((left, right) => this.stringService.compare(left, right, this.selectedOption)))
            })
        }
      })
  }

  deletePersonnel(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: this.personnel.filter(x => x.id == id)[0].lastName },
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.delete(id)
        }
      })
  }

  delete(id: string) {
    this.personnelService.deletePersonnel(id).subscribe(resposne => {
      if (resposne.errors.length === 0) {
        this.personnel = this.personnel.filter(x => x.id !== id).sort((left, right) => this.stringService.compare(left, right, this.selectedOption));
      }
    })
  }

  update(personnel: Personnel) {
    const dialogRef = this.dialog.open(UpdatePersonnelDialogComponent, {
      width: '450px',
      data: personnel,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: FormGroup) => {
        if (result !== undefined) {
          this.handleEdit(personnel.id, result);
        }
      })
  }

  handleEdit(id: string, result: FormGroup) {
    const entity: UpdatePersonnelRequest = {
      id: id,
      lastName: result.controls["lastName"].value,
      job: result.controls["job"].value,
      salary: result.controls["salary"].value,
      dateOfBirth: result.controls["dateOfBirth"].value,
    };

    this.personnelService.updatePersonnel(entity)
      .subscribe(_ => {
        this.personnelService.fetchPersonnelByName(null)
          .subscribe(response => this.personnel = response.sort((left, right) => this.stringService.compare(left, right, this.selectedOption)))
      });
  }
}
