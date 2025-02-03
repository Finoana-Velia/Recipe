import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { MainHeroComponent } from './hero/main-hero/main-hero.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { RegisterComponent } from './core/components/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ChefListComponent } from './features/chef/components/chef-list/chef-list.component';
import { ChefFormComponent } from './features/chef/components/chef-form/chef-form.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';

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
        ]
    }
];
