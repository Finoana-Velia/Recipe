import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NgForOf } from '@angular/common';
import { TextTruncatorPipe } from '../../pipes/text-truncator.pipe';
import { ProductService } from '../../../admin/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../admin/service/user.service';
import { InvoiceService } from '../../services/invoice.service';

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
  idUser! : number;

  constructor(
    private recipeService : RecipeService,

    private invoiceService : InvoiceService,
    private productService : ProductService,
    private activeRoute : ActivatedRoute,
    private userService : UserService
  ){}

  ngOnInit(): void {
    if(this.activeRoute.snapshot.params['id']) {
      this.idUser = this.activeRoute.snapshot.params['id'];
      this.userService.findById(this.idUser).subscribe(
        response => this.favorites = response.favorites
      );
    }
    //this.favorites = this.recipeService.getFavorites();
  }

  addToCart(product : any) {
    this.invoiceService.addToCart(product);
  }

  // toggleFavorite(product : any) {
  //   this.recipeService.toggleFavorite(product);
  // }

  retireToFavorite(id : number) {
    this.userService.retireToFavorite(this.idUser,id).subscribe();
    let index = this.favorites.findIndex(item => item.id === id);
    this.favorites.splice(index,1);
  }

  findProductImage(id : number) {
    return this.productService.getImage(id);
  }

}
