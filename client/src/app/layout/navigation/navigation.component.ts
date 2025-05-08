import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../visitor/services/auth.service';
import { UserService } from '../../admin/service/user.service';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{

  hidden : boolean = false;
  user! : any;

  constructor(
    private router : Router,
    private authService : AuthService,
    private userService : UserService
  ){}

  ngOnInit(): void {
    if(this.authService.isAuthChecked()) {
      this.userService.findUserAuthenticated().subscribe(
        response => this.user = response
      );
    }
  }

  register(){
    this.router.navigate(['register']);
    //this.router.navigate(['user']);
  }

  toggleHidden(){
    this.hidden = !this.hidden;
  }

  profilePicture(id : number) {
    return this.userService.findProfile(id);
  }

}
