import { NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Invoice } from '../../models/Invoice';

@Component({
  selector: 'app-new-recipe',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent implements OnInit{


  isActive = "Drinks";
  recipes! : any[];
  invoice! : Invoice;
  favorites! : any[];
  
  constructor(
    private recipeService : RecipeService,
  ){}

  ngOnInit(): void {
    this.recipes = this.recipeService.findAll().filter(item => item.category == this.isActive);
    this.favorites = this.recipeService.getFavorites();
  }

  toggleActive(type : string) {
    if(type == this.isActive) {
      return "bg-gray-100 border-b-lime-400 duration-100 border-b-8 text-2xl p-5 min-w-10 cursor-pointer";
    }
    return "text-2xl p-5 min-w-10 cursor-pointer";
  }

  active(type : string) {
    this.isActive = type;
    this.recipes = this.recipeService.findAll().filter(item => item.category == this.isActive);
  }

  addToCart(product : any) {
    this.recipeService.addToCart(product);
  }

  addFavorite(product : any) {
    this.recipeService.toggleFavorite(product);
    this.favorites = this.recipeService.getFavorites();
  }

  isFavorite(id : number) {
    const icon = "fa fa-heart";
    const favorite = this.recipeService.getFavorites()
    .find(item => item.id == id);
    if(favorite) {
      return icon;
    }
    return icon + "-o";
  }

}
