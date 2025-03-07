import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageResponse,Pagination } from '../../models/PageResponse';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() pagination! : PageResponse;
  @Output() data = new EventEmitter<Pagination>();

  classAllowed = "bg-gray-300 p-1 ";

  changePage(page : number,size : number, totalPage : number) {
    this.data.emit({
      page : page,
      size : size,
      totalPage : totalPage
    });
  }

  onSelectOption(){
    this.data.emit({
      page : 0,
      size : this.pagination.size,
      totalPage : this.pagination.totalPages
    })
  }

  blockIncrementPage(page : number) {
    if(page == 0) {
      return this.classAllowed + "pointer-events-none";
    }
    return this.classAllowed;
  }

  blockDecrementPage(page : number,totalPages : number) {
    if(page + 1 === totalPages || totalPages == null) {
      return this.classAllowed + "pointer-events-none";
    }
    return this.classAllowed;
  }

}
