import { Routes } from '@angular/router';
import { MainHeroComponent } from './hero/main-hero/main-hero.component';
import { MainClientComponent } from './client/components/main-client/main-client.component';
import { CartComponent } from './client/components/cart/cart.component';
import { MarketPlaceComponent } from './client/components/market-place/market-place.component';
import { FavoriteComponent } from './client/components/favorite/favorite.component';
import { ProfileUserComponent } from './client/components/profile-user/profile-user.component';
import { MainComponent } from './admin/components/main/main.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { ChefComponent } from './admin/components/chef/chef.component';
import { ChefFormComponent } from './admin/components/chef-form/chef-form.component';
import { ProductComponent } from './admin/components/product/product.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';

export const routes: Routes = [
    { path : "", component : MainHeroComponent},
    // { path : "login", component : AuthComponent},
    // { path : "register", component : RegisterComponent},
    { path : "auth", component : MainComponent,
        children : [
            { path : '', component : DashboardComponent},
            { path : 'chef', component : ChefComponent},
            { path : 'chef/form', component : ChefFormComponent},
            { path : 'chef/form/:id', component : ChefFormComponent},
            { path : 'product', component : ProductComponent},
            // { path : 'product/dishs', component : DishsListComponent},
            // { path : 'product/pizzas', component : PizzasListComponent},
            // { path : 'product/drinks', component : DrinksListComponent},
            // { path : 'product/noodles', component : NoodlesListComponent},
            { path : 'product/form', component : ProductFormComponent},
            { path : 'product/form/:id', component : ProductFormComponent}
        ]
    },
    { path : "user", component : MainClientComponent,
        children : [
            { path : "" , component : MarketPlaceComponent},
            { path : "cart", component : CartComponent},
            { path : "favorite" , component  : FavoriteComponent},
            { path : "profile" , component : ProfileUserComponent},
            { path : "profile/:id", component : ProfileUserComponent}
        ]
    }
];
