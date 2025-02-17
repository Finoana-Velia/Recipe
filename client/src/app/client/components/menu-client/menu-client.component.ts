import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-client',
  imports: [
    
  ],
  templateUrl: './menu-client.component.html',
  styleUrl: './menu-client.component.css'
})
export class MenuClientComponent {

  isDropped = false;

  toggleDropped() {
    this.isDropped = !this.isDropped;
  }

}
