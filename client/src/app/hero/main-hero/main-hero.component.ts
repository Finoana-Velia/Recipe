import { Component } from '@angular/core';
import { NavigationComponent } from '../../layout/navigation/navigation.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeroHomeComponent } from '../hero-home/hero-home.component';
import { HeroPopularComponent } from '../hero-popular/hero-popular.component';
import { HeroQualityComponent } from '../hero-quality/hero-quality.component';
import { HeroAboutComponent } from '../hero-about/hero-about.component';
import { HeroCustomerComponent } from '../hero-customer/hero-customer.component';
import { HeroSubscribeComponent } from '../hero-subscribe/hero-subscribe.component';

@Component({
  selector: 'app-main-hero',
  imports: [
    NavigationComponent,
    HeroHomeComponent,
    HeroPopularComponent,
    HeroQualityComponent,
    HeroAboutComponent,
    HeroCustomerComponent,
    HeroSubscribeComponent,
    FooterComponent,
  ],
  templateUrl: './main-hero.component.html',
  styleUrl: './main-hero.component.css'
})
export class MainHeroComponent {

}
