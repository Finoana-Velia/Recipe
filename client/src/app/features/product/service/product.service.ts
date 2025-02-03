import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api/v1/products";

  constructor(private http : HttpClient) { }

  findAll(name = "", page = 0, size = 10){
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());
    params = params.set('name',name.toString());

    return this.http.get<any>(this.url,{params}).pipe(
      map(response => {return response})
    );
  }


  createProduct(product : any,file : File){
    const formData = new FormData();
    formData.append('file',file);
    formData.append("product",JSON.stringify(product));

    return this.http.post<any>(this.url,formData).pipe(
      map(response => console.log(response))
    );
  }

  updateProduct(id : number, product : any, file : File){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product",JSON.stringify(product));

    return this.http.put<any>(this.url + `/${id}`,formData).pipe(
      map(response => console.log(response))
    );
  }
  
}
