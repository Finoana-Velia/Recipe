import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api/v1/products";

  constructor(private http : HttpClient) { }

  searchForProducts(name = "",page = 0 ,size = 10) {
    return this.http.get<any>(this.url).pipe(
      map(response => console.log(response))
    );
  }
}
