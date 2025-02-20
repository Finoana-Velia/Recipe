import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Invoice } from '../../models/Invoice';
import { NgForOf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  invoice! : Invoice;
  cartContent! : any[];

  constructor(private recipeService : RecipeService) {}
  
  
  ngOnInit(): void {
    this.updateInvoice();
    this.cartContent = this.recipeService.getCartItem();
  }

  updateInvoice() {
    this.invoice = this.recipeService.getInvoice();
  }

  removeToCart(product : any) {
    this.recipeService.removeToCart(product);
    this.updateInvoice();
  }

  addToCart(product : any) {
    this.recipeService.addToCart(product);
    this.updateInvoice();
  }

  decrementItem(product : any) {
    this.recipeService.reduceItem(product);
    this.updateInvoice();
  }

}
