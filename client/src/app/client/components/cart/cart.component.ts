import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Invoice } from '../../models/Invoice';
import { InvoiceService } from '../../services/invoice.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  productCount = 1;
  invoice! : Invoice;

  constructor(private invoiceService : InvoiceService) {}
  
  
  ngOnInit(): void {
    this.invoice = this.invoiceService.getInvoice();
  }

  incrementProduct() {
    this.productCount++;
  }

  decrementProduct() {
    this.productCount--;
  }
}
