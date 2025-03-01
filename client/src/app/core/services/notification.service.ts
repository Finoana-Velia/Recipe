import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = "http://localhost:8080/api/v1/notifications";

  constructor(private http : HttpClient) { }

  findAll(page = 0, size = 5) {
    return this.http.get<any>(this.url).pipe(
      map(response => {return response})
    )
  }
}
