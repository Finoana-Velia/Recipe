import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NgClass, NgForOf } from '@angular/common';
import { ProductService } from '../../../features/product/service/product.service';
import { ChefService } from '../../../features/chef/service/chef.service';

@Component({
  selector: 'app-navigation-client',
  imports: [
    RouterLink,
    NgForOf,
    NgClass
  ],
  templateUrl: './navigation-client.component.html',
  styleUrl: './navigation-client.component.css'
})
export class NavigationClientComponent implements OnInit{

  menu = false;
  notification = false;
  cartContent = false;
  idUser : number = 1;
  notifList! : any;
  isAll : boolean = false;

  constructor(
    private recipeService : RecipeService,
    private notificationService : NotificationService,
    private productService : ProductService,
    private chefService : ChefService
  ){}

  ngOnInit(): void {
    this.notificationService.notificationForClient(0,5,1).subscribe(
      response => this.notifList = response.content
    );
  }

  toggleMenu() {
    this.menu = !this.menu;
    this.notification = false;
  }

  toggleNotification() {
    this.notification = !this.notification;
    this.menu = false;
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
    if(type === 'PRODUCT') {
      return mainClass + " rounded";
    }else {
      return mainClass + " rounded-full";
    }
  }

  viewAll() {
    this.isAll = !this.isAll;
    this.notificationService.notificationForClient(0,0,1).subscribe(
      response => this.notifList = response.content
    );
  }

  viewLess() {
    this.isAll = !this.isAll
    this.ngOnInit();
  }

}
