import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageResponse } from '../../core/models/PageResponse';
import { ChefService } from '../../admin/service/chef.service';

@Component({
  selector: 'app-hero-customer',
  imports: [
    NgForOf
  ],
  templateUrl: './hero-customer.component.html',
  styleUrl: './hero-customer.component.css'
})
export class HeroCustomerComponent implements OnInit{
  
  chefResponse! : PageResponse;

  constructor(private chefService : ChefService) {}
  
  ngOnInit(): void {
    this.chefService.findAll(0,2).subscribe(
      response => this.chefResponse = response
    );
  }

  getProfile(id : number) {
    return this.chefService.findProfile(id);
  }
  // customers = [
  //   {
  //     completeName : "John Doe",
  //     rate : 7.5,
  //     imgUrl : "images/chief3.png"
  //   },
  //   {
  //     completeName : "Joe Dowson",
  //     rate : 8.5,
  //     imgUrl : "images/chief2.png"
  //   }
  // ]
}
