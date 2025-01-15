import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private router : Router){}

  darkMode(){
    document.body.classList.toggle('dark');
    alert("All should be dark!");
  }

  register(){
    this.router.navigate(['register'])
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
