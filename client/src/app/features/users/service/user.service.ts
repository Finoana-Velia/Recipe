import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/v1/accounts";

  constructor(private http : HttpClient) { }

  findAll(page = 0,size = 0) {
    let params = new HttpParams();
    params = params.set('page',page.toString());
    params = params.set('size',size.toString());
    return this.http.get<any>(this.url,{params}).pipe(
      map(response => {return response})
    );
  }

  findById(id : number) {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(response => {return response})
    );
  }

  create(account : any, file : File) {
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(account).forEach(key => {
      formData.append(key, account[key]);
    });

    return this.http.post<any>(this.url,formData).pipe(
      map(response => console.log(response))
    );
  }

  update(id : number, account : any, file : File) {
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(account).forEach(key => {
      formData.append(key, account[key]);
    });

    return this.http.put<any>(this.url,formData).pipe(
      map(response => console.log(response))
    );
  }

  findProfile(id : number) {
    return this.url + "profile?id=" + id;
  }

  delete(id : number) {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      map(response => console.log(response))
    );
  }
}
