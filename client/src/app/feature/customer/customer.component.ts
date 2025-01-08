import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [
    NgForOf
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

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
