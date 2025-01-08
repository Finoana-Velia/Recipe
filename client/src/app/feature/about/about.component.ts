import { Component } from '@angular/core';
import { Product } from '../product/product-modal/product';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [
    NgForOf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  product : Product[] = [
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
  ]
}
