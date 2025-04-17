import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router : Router) { }

  handleError(error : HttpErrorResponse) {
    const status : number = error.status;

    switch(status) {
      case 401 : 
        this.router.navigate(['/unauthorized']);
        throw new Error("Unauthorized request");
      case 404 : 
       this.router.navigate(['/not-found']);
       throw new Error("Page not found");
      case 403 : 
        this.router.navigate(['/unauthorized']);
        throw new Error("Unauthorized request");
      case 500:
        this.router.navigate(['/server-error']);
        throw new Error("Something bad happened; please try again later");
      case 502:
        this.router.navigate(['/server-error']);
        throw new Error("Something bad happened; please try again later");
      case 503:
        this.router.navigate(['/server-error']);
        throw new Error("Something bad happened; please try again later");
      case 504:
        this.router.navigate(['/server-error']);
        throw new Error("Something bad happened; please try again later");
      default : 
      throw new Error("Something bad happened: Please try again later");
    }
  }
}
