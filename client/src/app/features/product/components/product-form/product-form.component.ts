import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  id! : number;

  constructor(private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.id = this.activatedRoute.snapshot.params['id'];
    }
  }




}
