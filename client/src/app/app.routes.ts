import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';

export const routes: Routes = [
    { path : "", component : ProductListComponent},
];
