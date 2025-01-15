import { Component } from '@angular/core';
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
  product : any[] = [
    {
      name : "veliafinoanapatrick@gmail.com",
      title : "Email Us",
      icons : "fa fa-envelope"
    },
    {
      name : "+ 261 32 52 699 40",
      title : "Call Us",
      icons : "fa fa-phone"
    },
    {
      name : "105 Garden Road New York",
      title : "Location",
      icons : 'fa fa-location-arrow'
    },
  ]
}
