import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Invoice, InvoiceRequest } from '../../models/Invoice';
import { NgForOf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../../features/product/service/product.service';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  invoice! : any;
  cartContent! : any[];
  discount! : number;

  constructor(
    private recipeService : RecipeService,
    private invoiceService : InvoiceService,
    private productService : ProductService
  ) {}
  
  
  ngOnInit(): void {
    this.updateInvoice();
    this.cartContent = this.invoiceService.getCart();
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

  updateInvoice() {
    this.invoice = this.invoiceService.getInvoice();
    this.discount = this.invoiceService.getDiscount();
  }

  removeToCart(product : any) {
    this.invoiceService.removeToCart(product);
    this.updateInvoice();
  }

  addToCart(product : any) {
    this.invoiceService.addToCart(product);
    this.updateInvoice();
  }

  decrementItem(product : any) {
    this.invoiceService.reduceQuantity(product);
    this.updateInvoice();
  }

  onSubmit() {
    // this.invoiceService.sendInvoiceRequest(
    //   this.generateInvoice()
    // ).subscribe(
    //   response => console.log(response)
    // )
    console.log(this.invoiceService.getInvoice());
  }

  

}
