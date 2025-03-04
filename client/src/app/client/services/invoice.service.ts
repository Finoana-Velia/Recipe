import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { InvoiceRequest } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = "http://localhost:8080/api/v1/invoice";

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
  private maxLength = 10

  constructor(private http : HttpClient) { }
  
  getCart() {
    return this.cart;
  }

  addToCart(product : any) {
    this.productIds.push(product.id);
    if(this.productIds.length >= this.maxLength) {
      this.maxLength += 10;
      this.discount += 5;
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
  }

  reduceQuantity(product : any) {
    let index = this.productIds.findIndex(item => item.id === product.id);
    this.productIds.splice(index,1);
    const alreadyGet = this.cart.find(item => item.id === product.id);
    if(alreadyGet) {
      alreadyGet.quantity == 1 ? this.removeToCart(product) : alreadyGet.quantity--;
    }
    if(this.productIds.length <= this.maxLength) {
      this.maxLength -= 10;
      this.discount -= 5;
    }
  }

  getDiscount() {
    return this.discount;
  }

  getInvoice() : InvoiceRequest {
    const deliveryFee = 5;
    const subtotal = this.cart.reduce((sum, item) => 
      sum + item.price*item.quantity,0
    );
    let total = subtotal + deliveryFee;
    const discountValue = (total * this.discount) / 100;
    total -= discountValue;
    return {
      reference : new Date() + "/" + 1,
      date : new Date(),
      isDelivered : false,
      subtotal : subtotal,
      total : total,
      discount : discountValue,
      deliveryFee : deliveryFee,
      productsIds : this.productIds,
      idAccount : 1,
    }
  }

}
