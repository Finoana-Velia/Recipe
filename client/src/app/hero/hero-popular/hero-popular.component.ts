import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-popular',
  imports: [
    NgForOf
  ],
  templateUrl: './hero-popular.component.html',
  styleUrl: './hero-popular.component.css'
})
export class HeroPopularComponent {
}
