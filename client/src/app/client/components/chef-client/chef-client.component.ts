import { Component, OnInit } from '@angular/core';
import { ChefService } from '../../../admin/service/chef.service';
import { NgForOf } from '@angular/common';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-chef-client',
  imports: [
    NgForOf,
    LoadingComponent
  ],
  templateUrl: './chef-client.component.html',
  styleUrl: './chef-client.component.css'
})
export class ChefClientComponent implements OnInit{

  chefs! : any;

  constructor(private chefService : ChefService) {}

  ngOnInit(): void {
    this.chefService.findAll(0,0).subscribe(
      response => this.chefs = response.content
    );
  }

  findChefPicture(id : number) {
    return this.chefService.findProfile(id);
  }

}
