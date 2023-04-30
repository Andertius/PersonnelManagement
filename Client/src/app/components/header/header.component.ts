import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PersonnelService } from 'src/app/services/personnel.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  formControl!: FormControl;

  constructor(
    private readonly personnelService: PersonnelService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.formControl = new FormControl('');
  }

  search() {
    this.personnelService.fetchPersonnelByName(this.formControl.value).subscribe(response => this.searchService.search(response))
  }

}
