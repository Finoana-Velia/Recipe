import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  imports: [
    NgClass
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent {

  isActive = "profile";


  changeActive(part : string) {
    this.isActive = part;
  }

  toggleActive(part : string) {
    const classValue = "hidden";
    if(part != this.isActive) {
      return classValue;
    }
    return '';
  }
}
