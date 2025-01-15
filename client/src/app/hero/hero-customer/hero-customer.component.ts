import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-customer',
  imports: [
    NgForOf
  ],
  templateUrl: './hero-customer.component.html',
  styleUrl: './hero-customer.component.css'
})
export class HeroCustomerComponent {
  customers = [
    {
      completeName : "John Doe",
      rate : 7.5,
      imgUrl : "images/chief3.png"
    },
    {
      completeName : "Joe Dowson",
      rate : 8.5,
      imgUrl : "images/chief2.png"
    }
  ]
}
