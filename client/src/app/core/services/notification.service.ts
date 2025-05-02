import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PageResponse } from '../models/PageResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // private url = "http://localhost:8080/api/v1/notifications";
  private url = environment.url + "notifications";
  private token = environment.token;

  constructor(private http : HttpClient) { }

  findAll(page = 0, size = 5) {
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());

    const options = {
      headers : new HttpHeaders({ Authorization : "Bearer " + this.token}),
      params : params
    }
    return this.http.get<any>(this.url, options).pipe(
      map(response => {return response})
    );
  }

  notificationForClient(page = 0, size = 0,id : number) {
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());
    
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`}),
      params : params
    };

    return this.http.get<PageResponse>(`${this.url}/user/${id}`,options).pipe(
      map(response => {return response})
    );
  }
}
