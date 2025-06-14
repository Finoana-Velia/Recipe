import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chef } from '../models/chef';
import { catchError, map } from 'rxjs';
import { PageResponse } from '../../core/models/PageResponse';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  //private url = "http://localhost:8080/api/v1/chefs";
  private url = environment.url + "chefs";
  private token = localStorage.getItem("token");

  constructor(
    private http : HttpClient,
    private errorHandler : ErrorHandlerService
  ) { }

  findAll(page = 0,size = 10, name = "") {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    params = params.set('name',name);

    return this.http.get<PageResponse>(this.url,{params}).pipe(
      map(response => {return response})
      ,catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  findById(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ` + localStorage.getItem("token")})
    }
    return this.http.get<Chef>(`${this.url}/${id}`, options).pipe(
      map(response => {return response})
      ,catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  createChef(chef : any, file : File) {
    const formData = new FormData();
    formData.append('file',file);
    Object.keys(chef).forEach(key => {
      formData.append(key, chef[key])
    });

    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ` + localStorage.getItem("token")})
    }
    
    return this.http.post<Chef>(this.url,formData,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    )
  }


  updateChef(id : number,chef : any, file : File){
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(chef).forEach(key => {
      formData.append(key, chef[key])
    });

    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer `+ localStorage.getItem("token")})
    }

    return this.http.put<Chef>(`${this.url}/${id}`,formData,options).pipe(
      map(response => console.log(response))
      ,catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  findProfile(id : number) {
    return this.url + "/profile?id=" + id;
  }

  deleteChef(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ` + localStorage.getItem("token")})
    }

    return this.http.delete<void>(`${this.url}/${id}`,options).pipe(
      map(response => console.log(response))
      ,catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }
}
