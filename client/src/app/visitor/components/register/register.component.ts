import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-register',
  imports: [
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
