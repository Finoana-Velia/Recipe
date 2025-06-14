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
import { AuthComponent } from './visitor/components/auth/auth.component';
import { RegisterComponent } from './visitor/components/register/register.component';
import { DishListComponent } from './admin/components/dish-list/dish-list.component';
import { PizzaListComponent } from './admin/components/pizza-list/pizza-list.component';
import { DrinkListComponent } from './admin/components/drink-list/drink-list.component';
import { NoodleListComponent } from './admin/components/noodle-list/noodle-list.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { InternalServerComponent } from './core/components/internal-server/internal-server.component';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';
import { authGuard } from './core/guard/auth.guard';
import { accessGuard } from './core/guard/access.guard';
import { ProductDetailsComponent } from './client/components/product-details/product-details.component';
import { TicketsListComponent } from './admin/components/tickets-list/tickets-list.component';

export const routes: Routes = [
    { path : "", component : MainHeroComponent},
    { path : "login" , component : AuthComponent},
    { path : "register", component : RegisterComponent},
    // { path : "login", component : AuthComponent},
    // { path : "register", component : RegisterComponent},
    { path : "auth", component : MainComponent,
        canActivate : [authGuard, accessGuard],
        data : { roles : ['ROLE_ADMIN']},
        children : [
            { path : '', component : DashboardComponent},
            { path : 'chef', component : ChefComponent},
            { path : 'chef/form', component : ChefFormComponent},
            { path : 'chef/form/:id', component : ChefFormComponent},
            { path : 'product', component : ProductComponent},
            { path : 'product/dishs', component : DishListComponent},
            { path : 'product/pizzas', component : PizzaListComponent},
            { path : 'product/drinks', component : DrinkListComponent},
            { path : 'product/noodles', component : NoodleListComponent},
            { path : 'product/form', component : ProductFormComponent},
            { path : 'product/form/:id', component : ProductFormComponent},
            { path : 'tickets', component : TicketsListComponent}
        ]
    },
    { path : "user", component : MainClientComponent,
        canActivate : [authGuard, accessGuard],
        data : { roles : ['ROLE_USER']},
        children : [
            { path : "" , component : MarketPlaceComponent},
            { path : "cart/:id", component : CartComponent},
            { path : "favorite/:id", component : FavoriteComponent},
            // { path : "favorite" , component  : FavoriteComponent},
            { path : "profile" , component : ProfileUserComponent},
            { path : "profile/:id", component : ProfileUserComponent},
            { path : "product/:id", component : ProductDetailsComponent}
        ]
    },

    { path : "unauthorized" , component : UnauthorizedComponent},
    { path : "server-error", component : InternalServerComponent},
    { path : "**", component : PageNotFoundComponent}
];
