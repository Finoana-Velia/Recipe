import { Component } from '@angular/core';
import { PageResponse } from '../../../core/models/PageResponse';
import { ProductService } from '../../service/product.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drink-list',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './drink-list.component.html',
  styleUrl: './drink-list.component.css'
})
export class DrinkListComponent {
  pageResponse ! : PageResponse;
  filter : string = "";

  constructor(private productService : ProductService) {}

  ngOnInit(): void {
    this.productService.findByCategory("DRINKS").subscribe(
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
