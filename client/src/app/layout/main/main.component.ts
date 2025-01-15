import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  toggleChange : boolean = true;

  change() {
    this.toggleChange = !this.toggleChange;
  }

}
