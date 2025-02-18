import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { ProductResponse } from '../../features/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices : Invoice = {
    products : [],
    subtotal : 0,
    discount : 0,
    delivery : 0,
    promoCode : "",
    total : 0
  }

  constructor() { }

  addToCart(product : any) {
    this.invoices.products.push(product);
    this.invoices.subtotal += product.price;
    this.invoices.total += this.invoices.subtotal;
  }

  supplyProduct(price : number) {
    this.invoices.subtotal += price;
  }

  getInvoice() {
    return this.invoices;
  }

  setInvoice(invoice : Invoice) {
    this.invoices = invoice;
  }

}
