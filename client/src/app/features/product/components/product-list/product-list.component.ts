import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

}
