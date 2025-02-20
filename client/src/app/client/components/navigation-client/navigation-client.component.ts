import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-navigation-client',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-client.component.html',
  styleUrl: './navigation-client.component.css'
})
export class NavigationClientComponent implements OnInit{

  menu = false;
  notification = false;
  cartContent = false;

  constructor(private recipeService : RecipeService){}

  ngOnInit(): void {
    if(this.recipeService.getCartItem.length !== 0 ){
      this.cartContent = true;
    }
  }

  toggleMenu() {
    this.menu = !this.menu;
    this.notification = false;
  }

  toggleNotification() {
    this.notification = !this.notification;
    this.menu = false;
  }

}
