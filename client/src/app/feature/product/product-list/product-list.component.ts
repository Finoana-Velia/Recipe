import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { PopularProductComponent } from '../popular-product/popular-product.component';
import { SuperQualityComponent } from '../super-quality/super-quality.component';

@Component({
  selector: 'app-product-list',
  imports: [
    NavigationComponent,
    PopularProductComponent,
    SuperQualityComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
