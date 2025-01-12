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
      rate : 7.5
    },
    {
      completeName : "Jane Dowson",
      rate : 8.5
    }
  ]
}
