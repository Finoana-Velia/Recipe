import { Component } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-chef-list',
  imports: [
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './chef-list.component.html',
  styleUrl: './chef-list.component.css'
})
export class ChefListComponent {
  
  constructor(private router : Router) {}


}
