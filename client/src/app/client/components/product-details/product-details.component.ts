import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../admin/models/product';
import { ProductService } from '../../../admin/service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../core/components/loading/loading.component';
import { ChefService } from '../../../admin/service/chef.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [
    LoadingComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product! : ProductResponse;
  id! :number;

  constructor(
    private chefService : ChefService,
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.productService.findById(this.id).subscribe(
        response => this.product = response
      );
    }
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

  findProfile(id : number) {
    return this.chefService.findProfile(id);
  }

}
