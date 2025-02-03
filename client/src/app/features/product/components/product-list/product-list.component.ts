import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  imports: [
    PaginationComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

}
