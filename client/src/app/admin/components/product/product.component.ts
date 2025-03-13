import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageResponse, Pagination } from '../../../core/models/PageResponse';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

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
      this.productService.findAll(search,
        this.productResponse.number,
        this.productResponse.size).subscribe(
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
