import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  hidden : boolean = false;

  constructor(private router : Router){}

  register(){
    this.router.navigate(['register']);
    //this.router.navigate(['user']);
  }

  toggleHidden(){
    this.hidden = !this.hidden;
  }

}
