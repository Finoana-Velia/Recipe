import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { PageResponse } from '../../../../core/models/PageResponse';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  productResponse! : PageResponse;

  constructor(private productService : ProductService){}


  ngOnInit(): void {
    this.productService.findAll().subscribe(
      response => this.productResponse = response
    );
  }

  getImage(id : number) {
    return this.productService.getImage(id);
  }

  

}
