import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PageResponse } from '../../core/models/PageResponse';
import { ProductService } from '../../admin/service/product.service';
import { NgForOf } from '@angular/common';
import { LoadingComponent } from '../../core/components/loading/loading.component';

@Component({
  selector: 'app-hero-popular',
  imports: [
    NgForOf,
    LoadingComponent
  ],
  templateUrl: './hero-popular.component.html',
  styleUrl: './hero-popular.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroPopularComponent implements OnInit{
  

  products! : PageResponse;

  constructor(private productService : ProductService) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe(
      response => this.products = response
    );
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

}
