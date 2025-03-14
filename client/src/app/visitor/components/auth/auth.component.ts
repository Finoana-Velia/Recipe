import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    NavigationComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
