import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ProfileUserComponent } from '../../../client/components/profile-user/profile-user.component';

@Component({
  selector: 'app-register',
  imports: [
    NavigationComponent,
    FooterComponent,
    ProfileUserComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
