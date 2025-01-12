import { Component } from '@angular/core';
import { Product } from '../../feature/product/product-modal/product';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-hero-about',
  imports: [
    NgForOf
  ],
  templateUrl: './hero-about.component.html',
  styleUrl: './hero-about.component.css'
})
export class HeroAboutComponent {
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
