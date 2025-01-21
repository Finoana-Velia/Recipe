import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { MainHeroComponent } from './hero/main-hero/main-hero.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { RegisterComponent } from './core/components/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path : "", component : MainHeroComponent},
    { path : "login", component : AuthComponent},
    { path : "register", component : RegisterComponent},
    { path : "auth", component : MainComponent,
        children : [
            { path : '', component : DashboardComponent}
        ]
    }
];
