import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  products = [
    /* DRINKS */
    {
      id : 1,
      image : "images/mojito-720x720-primary-6a57f80e200c412e9a77a1687f312ff7.jpg",
      name : "Mojitos",
      price : 0.99,
      quantity : 0,
      category : "Drinks"
    },
    {
      id : 2,
      image : "images/manhattan-4000x4000-primary-ig-9c3d894510284e9d8fbd9c518d00790b.jpg",
      name : "Amaretto",
      price : 1.00,
      quantity : 0,
      category : "Drinks"
    },
    {
      id : 3,
      image : "images/vodka-martini-1500x1500-hero-080af5bb8ff04851a9c0ecf77a88a818.jpg",
      name : "Manhatthan",
      price : 1.95,
      quantity : 0,
      category : "Drinks"
    },
    {
      id : 4,
      image : "images/amaretto-sour-4000x4000-primary-ig-a49e20dfa0814f50bdaf3fd41e590a17.jpg",
      name : "Vodka Martini",
      price : 1.99,
      quantity : 0,
      category : "Drinks"
    },
    {
      id : 5,
      image : "images/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
      name : "Daiquiri",
      price : 2.00,
      quantity : 0,
      category : "Drinks"
    },

    /* PIZZAS */
    {
      id : 6,
      image : "images/i179313-4-pizza-burger.jpeg",
      name : "Pizza Peperonni",
      price : 10.00,
      quantity : 0,
      category : "Pizzas"
    },

    /* Noodles */
    {
      id : 7,
      image : "images/Easy-Vegan-Pad-Thai_3680.jpg",
      name : "Pad Thai Vegan",
      price : 12.50,
      quantity : 0,
      category : "Noodles"
    },
    {
      id : 8,
      image : "images/Recette_de_Nouilles_Sautees_aux_Legumes.webp",
      name : "Vegetable Noodles",
      price : 10.00,
      quantity : 0,
      category : "Noodles"
    },
    {
      id : 9,
      image : "images/36617231.webp",
      name : "Japaneese Noodle",
      price : 10.00,
      quantity : 0,
      category : "Noodles"
    },

    /* DISHS */
    {
      id : 10,
      image : "images/i27245-recette-de-fajitas.jpeg",
      name : "Fajitas",
      price : 5.25,
      quantity : 0,
      category : "Dishs"
    },
    {
      id : 11,
      image : "images/i130782-poulet-basquaise-au-cookeo.jpeg",
      name : "basquaise Chicken",
      price : 10.95,
      quantity : 0,
      category : "Dishs"
    },
    {
      id : 12,
      image : "images/pate-au-tacos.jpg",
      name : "Taco Pasta",
      price : 10.00,
      quantity : 0,
      category : "Dishs"
    },
  ];

  private cart : {
    id : number,
    image : string,
    name : string,
    price : number,
    quantity : number,
    category : string
  } [] = [];

  private favorites : any[] = [];

  constructor() { }

  findAll() {
    return this.products;
  }

  getCartItem() {
    return this.cart;
  }

  getFavorites() {
    return this.favorites;
  }

  toggleFavorite(product : any){
    const favorite = this.favorites.find(item => item.id == product.id);
    if(favorite) {
      let index = this.favorites.findIndex(item => item.id == product.id);
      this.favorites.splice(index,1);
    }else {
      this.favorites.push(product);
    }
  }

  addToCart(product : any) {
    const alreadyGet = this.cart.find(item => item.id == product.id);
    if(alreadyGet) {
      alreadyGet.quantity++;
    }else {
      this.cart.push({...product, quantity : 1})
    }
  }

  reduceItem(product : any) {
    const alreadyGet = this.cart.find(item => item.id == product.id);
    if(alreadyGet) {
      alreadyGet.quantity == 1 ? this.removeToCart(product) : alreadyGet.quantity--;
    }
  }

  removeToCart(product : any) {
    let index = this.cart.findIndex((item => item.id == product.id));
    this.cart.splice(index,1);
  }

  getInvoice() : Invoice {
    const total = this.cart.reduce((sum, item) => 
      sum + item.price * item.quantity, 0
    );
    return {
      products : this.cart,
      subtotal : total,
      discount : 0,
      delivery : 0,
      promoCode : "",
      total : total 
    };
  }
}
