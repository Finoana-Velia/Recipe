import { Component } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MenuClientComponent } from '../menu-client/menu-client.component';
import { ChefClientComponent } from '../chef-client/chef-client.component';

@Component({
  selector: 'app-market-place',
  imports: [
    NewRecipeComponent,
    ChefClientComponent
  ],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css'
})
export class MarketPlaceComponent {

}
