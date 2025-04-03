import { Component, OnInit } from '@angular/core';
import { PageResponse } from '../../../core/models/PageResponse';
import { ProductService } from '../../service/product.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';

@Component({
  selector: 'app-dish-list',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit{
  
  pageResponse ! : PageResponse;
  filter : string = "";

  constructor(private productService : ProductService) {}

  ngOnInit(): void {
    this.productService.findByCategory("DISHS").subscribe(
      response => this.pageResponse = response
    );
  }

  getImage(id : number) {
    return this.productService.getImage(id);
  }

  onChange(filter : string) {
    this.pageResponse.content = this.pageResponse.content.filter(item => 
      item.name.toLowerCase().include(filter.toLowerCase())
    );
  }
}
