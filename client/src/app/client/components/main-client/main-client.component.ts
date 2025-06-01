import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ChefService } from '../../../admin/service/chef.service';
import { ProductService } from '../../../admin/service/product.service';
import { NgClass, NgForOf } from '@angular/common';
import { UserService } from '../../../admin/service/user.service';
import { AuthService } from '../../../visitor/services/auth.service';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-main-client',
  imports: [
    NgClass,
    NgForOf,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './main-client.component.html',
  styleUrl: './main-client.component.css'
})
export class MainClientComponent {

  user! : any;
  menu = false;
  notification = false;
  cartContent = false;
  notifList! : any;
  isAll : boolean = false;

  constructor(
    private recipeService : RecipeService,
    private notificationService : NotificationService,
    private productService : ProductService,
    private chefService : ChefService,
    private userService : UserService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    // this.notificationService.notificationForClient(0,5,1).subscribe(
    //   response => this.notifList = response.content
    // );
    if(this.authService.currentUserValue?.username) {
      this.userService.findUserAuthenticated(this.authService.currentUserValue.username).subscribe(
      response => {
        this.user = response;
        location.reload;
        this.getNotifications(this.user.id);
      }
    );
    }
    
  }

  getNotifications(id : number) {
    this.notificationService.notificationForClient(0,5,id).subscribe(
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

  getProfilePicture(id : number) {
    return this.userService.findProfile(id);
  }

  logout() {
    this.authService.signOut();
  }


}
