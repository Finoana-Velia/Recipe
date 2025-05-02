import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Invoice, InvoiceRequest } from '../../models/Invoice';
import { NgForOf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../../admin/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '../../util/FormatDate';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  invoice! : any;
  cartContent! : any[];
  discount! : number;
  dialog : boolean = false;
  idInvoice! : number;
  idUser! : number;

  _deliveryForm = new FormGroup({
    deliveryAdress : new FormControl("",{
      nonNullable : true,
      validators : Validators.required
    })
  })

  constructor(
    private recipeService : RecipeService,
    private invoiceService : InvoiceService,
    private productService : ProductService,
    private router : Router,
    private activeRoute : ActivatedRoute
  ) {}
  
  
  ngOnInit(): void {
    if(this.activeRoute.snapshot.params['id']) {
      this.idUser = this.activeRoute.snapshot.params['id'];
    }
    this.updateInvoice();
    this.cartContent = this.invoiceService.getCart();
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

  updateInvoice() {
    this.invoice = this.invoiceService.getInvoice(this.deliveryAddress,this.idUser);
    this.discount = this.invoiceService.getDiscount();
  }

  removeToCart(product : any) {
    this.invoiceService.removeToCart(product);
    this.updateInvoice();
  }

  addToCart(product : any) {
    this.invoiceService.addToCart(product);
    this.updateInvoice();
  }

  decrementItem(product : any) {
    this.invoiceService.reduceQuantity(product);
    this.updateInvoice();
  }

  onSubmit() {
    if(this.invoiceService.getCart().length != 0 && !this._deliveryForm.invalid){
      this.invoiceService.sendInvoiceRequest(
        this.invoiceService.getInvoice(this.deliveryAddress,this.idUser)
      ).subscribe(
        response => this.exportInvoice(response.id)
      );
      this.dialog = false;
      this.router.navigate(['user']);
    }else {
      alert("Order not send");
    }
  }

  toggleDialog() {
    this.dialog = !this.dialog;
  }

  exportInvoice(id : number) {
    this.invoiceService.exportRequest(id).subscribe(
      response => {
        let downloadUrl = URL.createObjectURL(response);
        let link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "invoice_" + id + formatDate(new Date()) + ".pdf";
        link.click();
      }
    );
  }

  get deliveryAddress() {
    return this._deliveryForm.controls.deliveryAdress.value;
  }

  // private formatDate(date : Date) {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}${month}${day}`;
  // }
  

}
