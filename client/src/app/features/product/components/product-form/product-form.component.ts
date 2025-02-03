import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  @ViewChild('image') image! : ElementRef;

  url? : string | ArrayBuffer | null;
  id! : number;

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
    chef : new FormControl(null,{
      nonNullable : true,
      validators : Validators.required
    })
  });

  constructor(private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.id = this.activatedRoute.snapshot.params['id'];
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
        this._productForm.controls.image.setValue(event.targer.files[0]);
      }
    }
  }


}
