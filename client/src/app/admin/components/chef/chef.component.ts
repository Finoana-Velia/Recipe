import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { PageResponse, Pagination } from '../../../core/models/PageResponse';
import { ChefService } from '../../service/chef.service';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-chef',
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './chef.component.html',
  styleUrl: './chef.component.css'
})
export class ChefComponent implements OnInit{

  pageResponse! : PageResponse;
    search : string = "";
  
  
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
  
    onChange(search : string) {
      this.chefService.findAll(this.pageResponse.number,this.pageResponse.size,search).subscribe(
        response => this.pageResponse = response
      );
    } 
  
    dataFromPagination(event : Pagination) {
      this.chefService.findAll(event.page,event.size,this.search).subscribe(
        response => this.pageResponse = response
      );
    }

}
