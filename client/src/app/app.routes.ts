import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { MainHeroComponent } from './hero/main-hero/main-hero.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { RegisterComponent } from './core/components/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ChefListComponent } from './features/chef/components/chef-list/chef-list.component';
import { ChefFormComponent } from './features/chef/components/chef-form/chef-form.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { ProductFormComponent } from './features/product/components/product-form/product-form.component';
import { DishsListComponent } from './features/product/components/dishs-list/dishs-list.component';
import { PizzasListComponent } from './features/product/components/pizzas-list/pizzas-list.component';
import { DrinksListComponent } from './features/product/components/drinks-list/drinks-list.component';
import { NoodlesListComponent } from './features/product/components/noodles-list/noodles-list.component';
import { MainClientComponent } from './client/components/main-client/main-client.component';
import { CartComponent } from './client/components/cart/cart.component';
import { MarketPlaceComponent } from './client/components/market-place/market-place.component';

export const routes: Routes = [
    { path : "", component : MainHeroComponent},
    { path : "login", component : AuthComponent},
    { path : "register", component : RegisterComponent},
    { path : "auth", component : MainComponent,
        children : [
            { path : '', component : DashboardComponent},
            { path : 'chef', component : ChefListComponent},
            { path : 'chef/form', component : ChefFormComponent},
            { path : 'chef/form/:id', component : ChefFormComponent},
            { path : 'product', component : ProductListComponent},
            { path : 'product/dishs', component : DishsListComponent},
            { path : 'product/pizzas', component : PizzasListComponent},
            { path : 'product/drinks', component : DrinksListComponent},
            { path : 'product/noodles', component : NoodlesListComponent},
            { path : 'product/form', component : ProductFormComponent},
            { path : 'product/form/:id', component : ProductFormComponent}
        ]
    },
    { path : "user", component : MainClientComponent,
        children : [
            { path : "" , component : MarketPlaceComponent},
            { path : "cart", component : CartComponent}
        ]
    }
];
