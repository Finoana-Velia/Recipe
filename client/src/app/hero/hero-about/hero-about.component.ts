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
      name : "developermail@example.com",
      title : "Email Us",
      icons : "fa fa-envelope"
    },
    {
      name : "+ 123 45 67 890 00",
      title : "Call Us",
      icons : "fa fa-phone"
    },
    {
      name : "105 Somewhere in the world",
      title : "Location",
      icons : 'fa fa-location-arrow'
    },
  ]
}
