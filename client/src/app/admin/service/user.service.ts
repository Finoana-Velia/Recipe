import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private url = "http://localhost:8080/api/v1/accounts";
  private url = environment.url + "accounts";
  //private token = environment.token;
  private token = environment.token;

  constructor(private http : HttpClient,private errorHandler : ErrorHandlerService) { }

  findAll(page = 0,size = 0) {
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());

    const options = {
      params : params,
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    };

    return this.http.get<any>(this.url,options).pipe(
      map(response => {return response}),
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

    return this.http.get<any>(`${this.url}/${id}`,options).pipe(
      map(response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  findUserAuthenticated(identifier : string | null) {
    const options = {
      headers : new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    }

    return this.http.get<any>(`${this.url}/user?identifier=${identifier}`,options).pipe(
      map(response => {return response}),
      catchError(error => {
        console.log(error);
        this.errorHandler.handleError(error);
        throw new Error("Error during the request sending");
      })
    );
    // let params = new HttpParams();

    // const options = {
    //   headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`}),
    //   params : params.set('identifier',identifier ? identifier : "")
    // };

    // return this.http.get<any>(`${this.url}/user`,options).pipe(
    //   map(response => {return response})
    // )
  }

  createAccount(account : any, file : File) {
    const formData = new FormData();
    formData.append('profileUser',file);
    formData.append('accountRequest', JSON.stringify(account));

    return this.http.post<any>(`${this.url}/save`,formData).pipe(
      map(response => console.log(response))
    );
  }

  updateAccount(id : number,account : any, file : File) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    }
    
    const formData = new FormData();
    formData.append('profileUser',file);
    formData.append('accountRequest',JSON.stringify(account));
    
    return this.http.put<any>(`${this.url}/${id}`,formData,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }

  findProfile(id : number) {
    return this.url + "/profile?id=" + id;
  }

  delete(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorozation : `Bearer ${this.token}`})
    };

    return this.http.delete<void>(`${this.url}/${id}`,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    );
  }
}
