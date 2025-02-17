import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-client',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-client.component.html',
  styleUrl: './navigation-client.component.css'
})
export class NavigationClientComponent {

  menu = false;
  notification = false;


  toggleMenu() {
    this.menu = !this.menu;
    this.notification = false;
  }

  toggleNotification() {
    this.notification = !this.notification;
    this.menu = false;
  }

}
