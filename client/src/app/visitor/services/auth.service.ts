import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:8080/auth/login";
  
  private currentUserSubject : BehaviorSubject
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient) { }
  
  signIn(username : String, password : String) {
    this.http.post<any>(this.authUrl, {
      username : username,
      password : password
    }).pipe(
      tap(response => {
        localStorage.setItem("token",response.token);
        this.isAuth.next(true);

      })
    )
  }
}
