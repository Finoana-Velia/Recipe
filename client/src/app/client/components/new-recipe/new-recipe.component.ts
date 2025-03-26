import { NgClass, NgForOf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Invoice } from '../../models/Invoice';
import { ProductService } from '../../../admin/service/product.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-new-recipe',
  imports: [
    NgClass,
    NgForOf,
  ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewRecipeComponent implements OnInit{
onSlideChange() {
throw new Error('Method not implemented.');
}


onSwiper($event: Event) {
throw new Error('Method not implemented.');
}


  isActive = "DRINKS";
  recipes! : any[];
  invoice! : Invoice;
  favorites! : any[];
  recipesActive! : any;
  
  constructor(
    private recipeService : RecipeService,
    private productService : ProductService,
    private invoiceService : InvoiceService
  ){}

  ngOnInit(): void {

    this.productService.findAll("",0,0).subscribe(
      response => {
        this.recipes = response.content;
        console.log(this.recipes);
        this.recipesActive = this.recipes.filter(item => item.category == this.isActive);
      }
    )
    // this.recipes = this.recipeService.findAll().filter(item => item.category == this.isActive);
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
    // this.recipes = this.recipeService.findAll().filter(item => item.category == this.isActive);
    this.recipesActive = this.recipes.filter(item => item.category == this.isActive);
  }

  addToCart(product : any) {
    this.invoiceService.addToCart(product);
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

  findProductImage(id : number) {
    return this.productService.getImage(id);
  }

}
