import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefService } from '../../../chef/service/chef.service';
import { Chef } from '../../../chef/model/chef';
import { NgForOf } from '@angular/common';
import { ProductRequest } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  @ViewChild('image') image! : ElementRef;

  url? : string | ArrayBuffer | null;
  id! : number;
  chefList! : Chef[];

  _productForm = new FormGroup({
    image : new FormControl(),
    name : new FormControl("", {
      nonNullable : true,
      validators : Validators.required
    }),
    quantity : new FormControl(0,{
      nonNullable : true,
      validators : Validators.required
    }),
    price : new FormControl(0, {
      nonNullable : true,
      validators : Validators.required
    }),
    category : new FormControl("",{
      nonNullable : true,
      validators : Validators.required
    }),
    chef : new FormControl(0,{
      nonNullable : true,
      validators : Validators.required
    })
  });

  constructor(
    private activatedRoute : ActivatedRoute,
    private chefService : ChefService,
    private productService : ProductService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.chefService.findAll(0,0).subscribe(
      response => this.chefList = response.content
    );
    if(this.activatedRoute.snapshot.params['id']){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.productService.findById(this.id).subscribe(
        response => {
          this._productForm = new FormGroup({
            image : new FormControl(),
            name : new FormControl(response.name,{
              nonNullable : true,
              validators : Validators.required
            }),
            quantity : new FormControl(response.quantity,{
              nonNullable : true,
              validators : Validators.required
            }),
            price : new FormControl(response.price,{
              nonNullable : true,
              validators : Validators.required
            }),
            category : new FormControl(response.category,{
              nonNullable : true,
              validators : Validators.required
            }),
            chef : new FormControl(response.chef.id,{
              nonNullable : true,
              validators : Validators.required
            })
          });
          this.url = this.productService.getImage(this.id);
        }
      )
    }
  }

  activeInputFile(){
    this.image.nativeElement.click();
  }

  onSelectFile(event : any) {
    if(event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
        this._productForm.controls.image.setValue(event.target.files[0]);
      }
    }
  }

  onSubmit() {
    if(!this.id) {
      this.productService.createProduct(
        this.generatedProductValue(),
        this.imageValue
      ).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/auth/product']);
        }
      )
    }else {
      this.productService.updateProduct(
        this.id,
        this.generatedProductValue(),
        this.imageValue
      ).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/auth/product']);
        }
      )
    }
  }

  generatedProductValue() : Partial<ProductRequest> {
    return {
      name : this.name,
      price : this.price,
      category : this.category,
      quantity : this.quantity,
      idChef : this.chef
    }
  }

  get name() {
    return this._productForm.controls.name.value;
  }

  get price() {
    return this._productForm.controls.price.value;
  }

  get quantity() {
    return this._productForm.controls.quantity.value;
  }
  
  get category() {
    return this._productForm.controls.category.value;
  } 

  get chef() {
    return this._productForm.controls.chef.value;
  }

  get imageValue() {
    return this._productForm.controls.image.value;
  }
}
