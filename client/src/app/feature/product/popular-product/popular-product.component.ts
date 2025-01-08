import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../product-modal/product';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-popular-product',
  imports: [
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent {

  productList : Product[] = [
    {
      name : "Coca Cola",
      price : 1500.00
    },
    {
      name : "Pizza",
      price : 10000.00,
    },
    {
      name : "T-shirt",
      price : 500.00
    },
    {
      name : "Air Pods",
      price : 1000.00
    }
  ]
}
