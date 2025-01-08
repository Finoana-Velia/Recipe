import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-modal/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
  

    @Input() product! : Product;

   
}
