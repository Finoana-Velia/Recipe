import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { PageResponse, Pagination } from '../../../../core/models/PageResponse';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  productResponse! : PageResponse;
  search : string = "";
  event! : any;
  constructor(private productService : ProductService){}


  ngOnInit(): void {
    this.productService.findAll(this.search).subscribe(
      response => this.productResponse = response
    );
  }

  getImage(id : number) {
    return this.productService.getImage(id);
  }

  onChange(search : string) {
    this.productService.findAll(search).subscribe(
      response => this.productResponse = response
    );
  }

  dataFromPagination(event : Pagination) {
    this.productService.findAll(this.search,event.page,event.size)
    .subscribe(
      response => this.productResponse = response
    );
  }

  

}
