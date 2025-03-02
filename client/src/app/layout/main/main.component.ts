import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ChefService } from '../../features/chef/service/chef.service';
import { ProductService } from '../../features/product/service/product.service';

@Component({
  selector: 'app-main',
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink,
    NgForOf,
    NgClass
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
    private productService : ProductService
  ) {}

  ngOnInit() {
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
    const mainClass = 'w-[70px] h-[70px]'; 
    if(type === "PRODUCT") {
      return mainClass + " rounded";
    }else {
      return mainClass + " rounded-full";
    }
  }

}
