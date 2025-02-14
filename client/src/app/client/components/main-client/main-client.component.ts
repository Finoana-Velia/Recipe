import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { NavigationClientComponent } from '../navigation-client/navigation-client.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MenuClientComponent } from '../menu-client/menu-client.component';
import { ChefClientComponent } from '../chef-client/chef-client.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-main-client',
  imports: [
    NavigationClientComponent,
    NewRecipeComponent,
    MenuClientComponent,
    ChefClientComponent,
    FooterComponent
  ],
  templateUrl: './main-client.component.html',
  styleUrl: './main-client.component.css'
})
export class MainClientComponent {

}
