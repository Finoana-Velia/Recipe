import { Location, NgForOf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chef } from '../../models/chef';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefService } from '../../service/chef.service';
import { ProductService } from '../../service/product.service';
import { ProductRequest } from '../../models/product';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {


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
  availability : new FormControl(true,{
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
  chef : new FormControl<number|null>(null,{
    nonNullable : true,
    validators : Validators.required
  }),
  ingredients : new FormArray([])
});

constructor(
  private activatedRoute : ActivatedRoute,
  private chefService : ChefService,
  private productService : ProductService,
  private router : Router,
  private location : Location
) {}

ngOnInit(): void {
  this.chefService.findAll(0,0).subscribe(
    response => this.chefList = response.content
  );
  if(this.activatedRoute.snapshot.params['id']){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.url = this.productService.getImage(this.id);
    this.productService.findById(this.id).subscribe(
      response => {
        this._productForm = new FormGroup({
          image : new FormControl(),
          name : new FormControl(response.name,{
            nonNullable : true,
            validators : Validators.required
          }),
          availability : new FormControl(response.availability,{
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
          chef : new FormControl<number | null>(response.chef ? response.chef.id : null,{
            nonNullable : true,
            validators : Validators.required
          }),
          ingredients : new FormArray([])
        });
        this.setIngredients(response.ingredients)
      }
    )
  }
}

setIngredients(array : string[]){
  array.forEach((value) => {
    const control = new FormControl(value);
    (this._productForm.get('ingredients') as FormArray).push(control);
  })
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
        this.router.navigate(['/auth/product']);
      }
    )
  }
}

goBack() {
  this.location.back();
}

generatedProductValue() : Partial<ProductRequest> {
  return {
    name : this.name,
    price : this.price,
    category : this.category,
    availability : this.availability,
    idChef : this.chef,
    ingredients : this._productForm.value.ingredients
  }
}

addIngredients() {
  const control = new FormControl("");
  (<FormArray>this._productForm.get('ingredients')).push(control);
}

removeIngredients(index : number) {
  (<FormArray>this._productForm.get('ingredients')).removeAt(index);
}

get name() {
  return this._productForm.controls.name.value;
}

get price() {
  return this._productForm.controls.price.value;
}

get availability() {
  return this._productForm.controls.availability.value;
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

get ingredients() {
  return (<FormArray>this._productForm.get('ingredients')).controls;
}
}
