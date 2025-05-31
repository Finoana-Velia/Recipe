import { Component } from '@angular/core';
import { NavigationComponent } from '../../../layout/navigation/navigation.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [
    NavigationComponent,
    FooterComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isAllCorrect : boolean = true;
  isCredentialIncorrect : boolean = false;
  isAllValueIncorrect : boolean = false;
  showPassword : boolean = false;

  signInForm = new FormGroup({
    username : new FormControl('', { nonNullable : true, validators : Validators.required}),
    password : new FormControl('', { nonNullable : true, validators : Validators.required})
  })

  constructor(private authService : AuthService,private router : Router) {}

  signIn() {
    if(!this.signInForm.invalid) {
      this.authService.signIn(
        this.signInForm.controls.username.value,
        this.signInForm.controls.password.value
      ).subscribe(
        response => {
          console.log(response);
          if(this.authService.isAuthorized(["ROLE_USER"])) {
            this.router.navigate(['/user']);
          }else {
            this.router.navigate(['/auth']);
          }
        },
        error => {
          this.isAllCorrect = false;
          this.isCredentialIncorrect = true;
        }
      );
    }else {
      //alert("auth failed");
      this.isAllCorrect = false;
      this.isAllValueIncorrect = true;
    }
  }

  showText() {
    this.showPassword = !this.showPassword;
  }
}
