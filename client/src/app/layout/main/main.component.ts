import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  toggleChange : boolean = true;
  toggleSubMenu : boolean = false;

  change() {
    this.toggleChange = !this.toggleChange;
  }

  openSubmenu() {
    this.toggleSubMenu = !this.toggleSubMenu;
  }

}
