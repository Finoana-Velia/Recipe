import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NgForOf } from '@angular/common';
import { TextTruncatorPipe } from '../../pipes/text-truncator.pipe';

@Component({
  selector: 'app-favorite',
  imports: [
    NgForOf,
    TextTruncatorPipe
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit{

  favorites! : any[];

  constructor(private recipeService : RecipeService){}

  ngOnInit(): void {
    this.favorites = this.recipeService.getFavorites();
  }

  addToCart(product : any) {
    this.recipeService.addToCart(product);
  }

  toggleFavorite(product : any) {
    this.recipeService.toggleFavorite(product);
  }

}
