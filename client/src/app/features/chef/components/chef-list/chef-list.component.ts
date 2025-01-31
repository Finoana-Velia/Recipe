import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { ChefService } from '../../service/chef.service';
import { PageResponse } from '../../../../core/models/PageResponse';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-chef-list',
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './chef-list.component.html',
  styleUrl: './chef-list.component.css'
})
export class ChefListComponent implements OnInit{

  pageResponse! : PageResponse;

  constructor(
    private router : Router,
    private chefService : ChefService
  ) {}

  ngOnInit(): void {
    this.chefService.findAll(0,10).subscribe(
      response => this.pageResponse = response
    );
  }

  findProfile(id : number) {
    return this.chefService.findProfile(id);
  }


}
