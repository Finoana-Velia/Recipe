import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface User {
  username : string,
  role : any[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:8080/auth/login";
  
  private currentUserSubject! : BehaviorSubject<User | null>;
  private currentUser! : Observable<User | null>;
  
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient,private router : Router) {
    //this.autoSignIn();
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  // constructor
  // autoSignIn() {
  //   if(localStorage.getItem("token")) {
  //     this.isAuth.next(true);
  //     if(this.isAuthorized(["ROLE_USER"])) {
  //       this.router.navigate(['/user']);
  //     }else {
  //       this.router.navigate(['/auth']);
  //     }
  //   }
  // }
  
  //auth component
  signIn(username : string, password : string) {
    return this.http.post<any>(this.authUrl, {
      username : username,
      password : password
    }).pipe(
      tap(response => {
        localStorage.setItem("token",response.token);
        this.isAuth.next(true);
        const user : User = {
          username : username,
          role : response.role
        };
        this.currentUserSubject.next(user);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      })
    );
  }

  // visitor component
  signOut() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.isAuth.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // isAuthorized & get role
  public get currentUserValue() : User | null {
    const storeUser = sessionStorage.getItem('currentUser');
    if(storeUser) {
      const user = JSON.parse(storeUser);
      this.currentUserSubject.next(user);
    }

    return this.currentUserSubject.value;
  }
 
  // SignIn & AutoSign
  public isAuthorized(allowedRole : string[]) : boolean{
    const user = this.currentUserValue;
    if(!user) return false;
    console.log("user role : ");
    console.log(user.role);
    console.log("role parameter :");
    console.log(allowedRole);
    return user.role.some(role => allowedRole.includes(role.authority))
  }

  //
  public isAuthChecked() {
    if(localStorage.getItem('token')) {
      this.isAuth.next(true);
    }
    return this.isAuth.value;
  }

  //
  get authToken() {
    return sessionStorage.getItem("token");
  }

  //
  get userRole() {
    return this.currentUserValue?.role;
  }
}
