import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Invoice, InvoiceRequest } from '../models/Invoice';
import { formatDate } from '../util/FormatDate';
import { PageResponse } from '../../core/models/PageResponse';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  // private url = "http://localhost:8080/api/v1/invoices";
  private url = environment.url + "invoices";
  private token = localStorage.getItem("token");

  private cart : {
    id : number,
    image : string,
    name : string,
    price : number,
    quantity : number,
    category : string
  } [] = [];

  private favorites : any[] = [];

  private productIds : any[] = [];

  private discount = 0;

  constructor(
    private http : HttpClient,
    private errorHandler : ErrorHandlerService
  ) { }

  findAll(reference = "", page = 0, size = 0) {
    let params = new HttpParams();
    params = params.set('reference', reference.toString());
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    const options = {
      headers : new HttpHeaders({ Authorization : "Bearer " + this.token}),
      params : params
    }

    return this.http.get<any>(this.url, options).pipe(
      map(response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing")
      })
    );
  }

  findById(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : 'Bearer ' + this.token})
    };

    return this.http.get<any>(`${this.url}/${id}`,options).pipe(
      map(response => {return response}),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    )
  }

  confirmDelivery(id :number) {
    const options = {
      headers : new HttpHeaders({ Authorization : 'Bearer ' + this.token})
    };
    return this.http.get<any>(`${this.url}/confirm/${id}`,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    )
  }
  
  getCart() {
    return this.cart;
  }

  addToCart(product : any) {
    this.productIds.push(product.id);
    if(this.productIds.length == 10) {
      this.discount = 5;
    }
    const alreadyGet = this.cart.find(item => item.id === product.id);
    if(alreadyGet) {
      alreadyGet.quantity++;
    }else {
      this.cart.push({...product,quantity : 1});
    }
  }

  removeToCart(product : any) {
    let index = this.cart.findIndex(item => item.id == product.id);
    this.cart.splice(index,1);
    this.productIds = this.productIds.filter(item => item !== product.id);
    this.decrementDiscount();
  }

  reduceQuantity(product : any) {
    let index = this.productIds.findIndex(item => item === product.id);
    this.productIds.splice(index,1);
    this.decrementDiscount();
    const alreadyGet = this.cart.find(item => item.id === product.id);
    if(alreadyGet) {
      alreadyGet.quantity == 1 ? this.removeToCart(product) : alreadyGet.quantity--;
    }
  }

  decrementDiscount() {
    if(this.productIds.length < 10) {
      this.discount = 0;
    }
  }

  getDiscount() {
    return this.discount;
  }

  sendInvoiceRequest(invoice : any) {
    const options = {
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`}),
    }
    return this.http.post<any>(this.url,invoice,options).pipe(
      map(response => {
        this.cart = [];
        this.productIds = [];
        this.discount = 0;
        return response
      })
    );
  }

  exportRequest(id : number) {
    return this.http.get(`${this.url}/export/${id}`, {
      responseType : 'blob',
      headers : new HttpHeaders({ Authorization : `Bearer ${this.token}`})
    });
  }

  getInvoice(address : string,idUser : number) : InvoiceRequest {
    const deliveryFee = 5;
    const subtotal = this.cart.reduce((sum, item) => 
      sum + item.price*item.quantity,0
    );
    let total = subtotal + deliveryFee;
    const discountValue = (total * this.discount) / 100;
    total -= discountValue;
    return {
      reference : formatDate(new Date()) + "/" + 1,
      date : new Date(),
      deliveryAdress : address,
      isDelivered : false,
      subtotal : subtotal,
      total : total,
      discount : discountValue,
      deliveryFee : deliveryFee,
      productIds : this.productIds,
      idAccount : idUser,
    }
  }



  deleteInvoice(id : number) {
    const options = {
      headers : new HttpHeaders({ Authorization : 'Bearer ' + this.token})
    };

    return this.http.delete<void>(`${this.url}/${id}`,options).pipe(
      map(response => console.log(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw new Error("Error during the request processing");
      })
    )
  }

}
