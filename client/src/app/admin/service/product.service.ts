import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
import { catchError, map } from 'rxjs';
import { PageResponse } from '../../core/models/PageResponse';
import { ProductResponse } from '../models/product';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private url = "http://localhost:8080/api/v1/products";

  private url = environment.url + "products";
  private token = localStorage.getItem("token");

  constructor(private http : HttpClient, private errorHandler : ErrorHandlerService) { }

  findAll(name = "", page = 0, size = 10){
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());
    params = params.set('name',name.toString());

    return this.http.get<PageResponse>(this.url,{params}).pipe(
      map(response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  findByCategory(category : string,page = 0, size = 0) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    const options = {
      params : params,
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    };

    return this.http.get<PageResponse>(`${this.url}/category/${category}`, options).pipe(
      map( response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
      
    );
  }

  findById(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    };

    return this.http.get<ProductResponse>(`${this.url}/${id}`,options).pipe(
      map( response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  createProduct(product : any,file : File){
    const formData = new FormData();
    formData.append('file',file);
    formData.append("product",JSON.stringify(product));

    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    }

    return this.http.post<any>(this.url,formData,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  updateProduct(id : number, product : any, file : File){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productDto",JSON.stringify(product));

    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    };

    return this.http.put<any>(this.url + `/${id}`,formData, options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  getImage(id : number) {
    return this.url + "/image?id=" + id;
  }

  deleteProduct(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    }

    return this.http.delete<void>(`${this.url}/${id}`,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    )
  }
  
}
