import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { PopularProductComponent } from '../popular-product/popular-product.component';
import { SuperQualityComponent } from '../super-quality/super-quality.component';
import { AboutComponent } from '../../about/about.component';
import { CustomerComponent } from '../../customer/customer.component';
import { SubscribeComponent } from '../../subscribe/subscribe.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-product-list',
  imports: [
    NavigationComponent,
    PopularProductComponent,
    SuperQualityComponent,
    AboutComponent,
    CustomerComponent,
    SubscribeComponent,
    FooterComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
