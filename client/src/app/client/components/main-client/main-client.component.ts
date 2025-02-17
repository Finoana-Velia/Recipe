import { Component } from '@angular/core';
import { NavigationClientComponent } from '../navigation-client/navigation-client.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-client',
  imports: [
    NavigationClientComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './main-client.component.html',
  styleUrl: './main-client.component.css'
})
export class MainClientComponent {

}
