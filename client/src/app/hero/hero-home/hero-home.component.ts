import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../core/components/loading/loading.component';

@Component({
  selector: 'app-hero-home',
  imports: [
    RouterLink,
  ],
  templateUrl: './hero-home.component.html',
  styleUrl: './hero-home.component.css'
})
export class HeroHomeComponent {

}
