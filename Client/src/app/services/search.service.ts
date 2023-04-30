import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Personnel } from '../models/personnel';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

  // Observable string sources
  private searchSource = new Subject<Personnel[]>();

  // Observable string streams
  search$ = this.searchSource.asObservable();

  // Service message commands
  search(mission: Personnel[]) {
    this.searchSource.next(mission);
  }
}
