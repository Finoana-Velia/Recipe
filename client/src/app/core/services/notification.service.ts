import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = "http://localhost:8080/api/v1/notifications";

  constructor(private http : HttpClient) { }

  findAll(page = 0, size = 5) {
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());
    return this.http.get<any>(this.url, {params}).pipe(
      map(response => {return response})
    )
  }
}
