import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chef } from '../model/chef';
import { map } from 'rxjs';
import { PageResponse } from '../../../core/models/PageResponse';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private url = "http://localhost:8080/api/v1/chefs";

  constructor(private http : HttpClient) { }

  findAll(page = 0,size = 10, name = "") {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    params = params.set('name',name);

    return this.http.get<PageResponse>(this.url,{params}).pipe(
      map(response => {return response})
    );
  }

  findById(id : number) {
    return this.http.get<Chef>(`${this.url}/${id}`).pipe(
      map(response => {return response})
    );
  }

  createChef(chef : any, file : File){
     
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(chef).forEach(key => {
      formData.append(key, chef[key])
    });

    return this.http.post<Chef>(this.url,formData).pipe(
      map(response => console.log(response))
    );

  }

  updateChef(id : number,chef : any, file : File){
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(chef).forEach(key => {
      formData.append(key, chef[key])
    });

    return this.http.put<Chef>(`${this.url}/${id}`,formData).pipe(
      map(response => console.log(response))
    );
  }

  findProfile(id : number) {
    return this.url + "/profile?id=" + id;
  }

  deleteChef(id : number) {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      map(response => console.log(response))
    );
  }
}
