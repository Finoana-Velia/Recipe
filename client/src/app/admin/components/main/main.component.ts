import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { ChefService } from '../../service/chef.service';
import { ProductService } from '../../service/product.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../visitor/services/auth.service';

@Component({
  selector: 'app-main',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  toggleChange : boolean = true;
  toggleSubMenu : boolean = false;
  notificationMenu : boolean = false;

  notifications! : any;
  isAll : boolean = false;

  constructor(
    private notificationService : NotificationService,
    private chefService : ChefService,
    private productService : ProductService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.notificationService.findAll().subscribe(
      response => this.notifications = response.content
    );
  }

  change() {
    this.toggleChange = !this.toggleChange;
  }

  openSubmenu() {
    this.toggleSubMenu = !this.toggleSubMenu;
  }

  toggleNotification() {
    this.notificationMenu = !this.notificationMenu;
  }
  
  viewAll() {
    this.isAll = !this.isAll;
    this.notificationService.findAll(0,0).subscribe(
      response => this.notifications = response.content
    );
  }

  viewLess() {
    this.isAll = !this.isAll
    this.ngOnInit();
  }

  imageNotified(type : string,id : number) {
    if(type === "PRODUCT") {
      return this.productService.getImage(id);
    }else {
      return this.chefService.findProfile(id);
    }
  }

  imageClassNotified(type : string) {
    const mainClass = 'w-full h-full object-cover object-center'; 
    if(type === "PRODUCT") {
      return mainClass + " rounded";
    }else {
      return mainClass + " rounded-full";
    }
  }

  signOut() {
    this.authService.signOut();
  }


}
