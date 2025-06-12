import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../admin/models/product';
import { ProductService } from '../../../admin/service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../core/components/loading/loading.component';
import { ChefService } from '../../../admin/service/chef.service';
import { NgClass, NgForOf } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { UserService } from '../../../admin/service/user.service';
import { AuthService } from '../../../visitor/services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [
    LoadingComponent,
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product! : ProductResponse;
  id! :number;
  favorites ! : any[];
  userConnected : any;

  constructor(
    private chefService : ChefService,
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private invoiceService : InvoiceService,
    private userService : UserService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.productService.findById(this.id).subscribe(
        response => this.product = response
      );
    }

    if(this.authService.currentUserValue?.username) {
      this.userService.findUserAuthenticated(this.authService.currentUserValue.username).subscribe(
        response => {
          this.userConnected = response
          this.favorites = this.userConnected.favorites;
        }
      );
    }
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

  findProfile(id : number) {
    return this.chefService.findProfile(id);
  }

  addToCard(product : any) {
    this.invoiceService.addToCart(product);
  }

  toggleFavorite(product : any) {
    const favoriteItem = this.favorites.find(item => item.id === product.id);
    if(favoriteItem) {
      this.userService.retireToFavorite(this.userConnected.id,product.id).subscribe();
      let index = this.favorites.findIndex(item => item.id === product.id);
      this.favorites.splice(index,1);
    }else {
      this.userService.addToFavorite(this.userConnected.id,product.id).subscribe();
      this.favorites.push(product);
    }
  }

  isFavorite(id : number) {
    const icon = "fa fa-heart";
    const favorite = this.favorites.find(item => item.id === id);
    if(favorite) {
      return icon;
    }
    return icon + "-o";
  }

}
