import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [
    NgForOf
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

}
