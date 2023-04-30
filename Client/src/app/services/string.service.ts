import { Injectable } from '@angular/core';
import { Personnel } from '../models/personnel';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  isNullOrEmpty(value: string | undefined): boolean {
    return !value || value === undefined || value === "" || value.length === 0;
  }
  
  compare(left: Personnel, right: Personnel, sortBy: string) {
    switch (sortBy) {
      case 'job':
        return this.compareJobs(left, right);
      case 'salary':
        return this.compareSalaries(left, right);
      case 'dateOfBirth':
        return this.compareDates(left, right);
      default:
        return this.compareNames(left, right);
    }
  }

  compareNames(left: Personnel, right: Personnel) {
    if (left.lastName > right.lastName) {
      return 1
    } else if (left.lastName < right.lastName) {
      return -1
    } else {
      return 0
    }
  }

  compareJobs(left: Personnel, right: Personnel) {
    if (left.job > right.job) {
      return 1
    } else if (left.job < right.job) {
      return -1
    } else {
      return 0
    }
  }

  compareSalaries(left: Personnel, right: Personnel) {
    if (left.salary > right.salary) {
      return 1
    } else if (left.salary < right.salary) {
      return -1
    } else {
      return 0
    }
  }

  compareDates(left: Personnel, right: Personnel) {
    if (left.dateOfBirth > right.dateOfBirth) {
      return 1
    } else if (left.dateOfBirth < right.dateOfBirth) {
      return -1
    } else {
      return 0
    }
  }
}
