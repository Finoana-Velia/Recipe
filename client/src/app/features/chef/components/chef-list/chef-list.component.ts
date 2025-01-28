import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { ChefService } from '../../service/chef.service';

@Component({
  selector: 'app-chef-list',
  imports: [
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './chef-list.component.html',
  styleUrl: './chef-list.component.css'
})
export class ChefListComponent implements OnInit{
  
  constructor(
    private router : Router,
    private chefService : ChefService
  ) {}

  ngOnInit(): void {
    this.chefService.findAll().subscribe();
  }


}
