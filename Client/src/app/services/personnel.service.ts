import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personnel } from 'src/app/models/personnel';
import { environment } from 'src/environments/environment';
import { AddPersonnelResponse } from '../models/responses/addPersonnelResponse';
import { AddPersonnelRequest } from '../models/requests/addPersonnelRequest';
import { UpdatePersonnelRequest } from '../models/requests/updatePersonnelRequest';
import { UpdatePersonnelResponse } from '../models/responses/updatePersonnelResponse';
import { DeletePersonnelResponse } from '../models/responses/deletePersonnelResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public fetchPersonnelByName = (name: string | null) => {
    let params = new HttpParams().set('name', name ?? "");
    return this.http.get<Personnel[]>(`${this.baseUrl}/api/personnel`, { params });
  }

  public fetchPersonnelById = (id: string) => {
    return this.http.get<Personnel>(`${this.baseUrl}/api/personnel/${id}`);
  }

  public addPersonnel = (person: AddPersonnelRequest) => {
    return this.http.post<AddPersonnelResponse>(`${this.baseUrl}/api/personnel`, person);
  }

  public updatePersonnel = (person: UpdatePersonnelRequest) => {
    return this.http.put<UpdatePersonnelResponse>(`${this.baseUrl}/api/personnel`, person);
  }

  public deletePersonnel = (id: string) => {
    return this.http.delete<DeletePersonnelResponse>(`${this.baseUrl}/api/personnel/${id}`);
  }
}
