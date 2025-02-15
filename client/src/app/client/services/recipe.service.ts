import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  products = [
    /* DRINKS */
    {
      image : "images/mojito-720x720-primary-6a57f80e200c412e9a77a1687f312ff7.jpg",
      name : "Mojitos",
      price : 0.99,
      quantity : 0,
      category : "Drinks"
    },
    {
      image : "images/manhattan-4000x4000-primary-ig-9c3d894510284e9d8fbd9c518d00790b.jpg",
      name : "Amaretto",
      price : 1.00,
      quantity : 0,
      category : "Drinks"
    },
    {
      image : "images/vodka-martini-1500x1500-hero-080af5bb8ff04851a9c0ecf77a88a818.jpg",
      name : "Manhatthan",
      price : 1.95,
      quantity : 0,
      category : "Drinks"
    },
    {
      image : "images/amaretto-sour-4000x4000-primary-ig-a49e20dfa0814f50bdaf3fd41e590a17.jpg",
      name : "Vodka Martini",
      price : 1.99,
      quantity : 0,
      category : "Drinks"
    },
    {
      image : "images/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef.jpg",
      name : "Daiquiri",
      price : 2.00,
      quantity : 0,
      category : "Drinks"
    },

    /* PIZZAS */
    {
      image : "images/i179313-4-pizza-burger.jpeg",
      name : "Pizza Peperonni",
      price : 10.00,
      quantity : 0,
      category : "Pizzas"
    },

    /* Noodles */
    {
      image : "images/Easy-Vegan-Pad-Thai_3680.jpg",
      name : "Pad Thai Vegan",
      price : 12.50,
      quantity : 0,
      category : "Noodles"
    },
    {
      image : "images/Recette_de_Nouilles_Sautees_aux_Legumes.webp",
      name : "Vegetable Noodles",
      price : 10.00,
      quantity : 0,
      category : "Noodles"
    },
    {
      image : "images/36617231.webp",
      name : "Japaneese Noodle",
      price : 10.00,
      quantity : 0,
      category : "Noodles"
    },

    /* DISHS */
    {
      image : "images/i27245-recette-de-fajitas.jpeg",
      name : "Fajitas",
      price : 5.25,
      quantity : 0,
      category : "Dishs"
    },
    {
      image : "images/i130782-poulet-basquaise-au-cookeo.jpeg",
      name : "basquaise Chicken",
      price : 10.95,
      quantity : 0,
      category : "Dishs"
    },
    {
      image : "images/pate-au-tacos.jpg",
      name : "Taco Pasta",
      price : 10.00,
      quantity : 0,
      category : "Dishs"
    },
  ]

  constructor() { }

  findAll() {
    return this.products;
  }
}
