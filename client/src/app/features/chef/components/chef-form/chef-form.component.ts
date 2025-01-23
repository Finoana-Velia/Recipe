import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefService } from '../../service/chef.service';


@Component({
  selector: 'app-chef-form',
  imports: [],
  templateUrl: './chef-form.component.html',
  styleUrl: './chef-form.component.css'
})
export class ChefFormComponent {

  url? : string | ArrayBuffer | null;

  @ViewChild('profile') profile ! : ElementRef;

  chefId! : number;

  constructor(private chefService : ChefService) {}

  

}
