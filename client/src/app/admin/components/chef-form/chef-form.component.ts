import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChefService } from '../../service/chef.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chef } from '../../models/chef';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chef-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './chef-form.component.html',
  styleUrl: './chef-form.component.css'
})
export class ChefFormComponent implements OnInit {

  url? : string | ArrayBuffer | null;
  
    test : string | null = null;
  
    @ViewChild('profile') profile ! : ElementRef;
  
    chefId! : number;
  
    _chefForm = new FormGroup({
      profile : new FormControl(),
      firstName : new FormControl('',{
        nonNullable : true,
        validators : Validators.required
      }),
      lastName : new FormControl('',{
        nonNullable : true,
        validators : Validators.required
      }),
      birthDate : new FormControl(new Date(), {
        nonNullable : true,
        validators : Validators.required
      }),
      gender : new FormControl("",{
        nonNullable : true,
        validators : Validators.required
      }),
      speciality : new FormControl("",{
        nonNullable : true,
        validators : Validators.required
      }),
      description : new FormControl("")
    });
  
    constructor(
      private chefService : ChefService,
      private router : Router,
      private activatedRoute : ActivatedRoute,
      private location : Location
    ) {}
  
    ngOnInit(): void {
      if(this.activatedRoute.snapshot.params['id']) {
        this.chefId = this.activatedRoute.snapshot.params['id'];
        this.chefService.findById(this.chefId).subscribe(
          response => {
            this._chefForm = new FormGroup({
              profile : new FormControl(),
              firstName : new FormControl(this.getFirstName(response.name),{
                nonNullable : true,
                validators : Validators.required
              }),
              lastName : new FormControl(this.getLastName(response.name),{
                nonNullable : true,
                validators : Validators.required
              }),
              birthDate : new FormControl(response.birthDate, {
                nonNullable : true,
                validators : Validators.required
              }),
              gender : new FormControl(response.gender,{
                nonNullable : true,
                validators : Validators.required
              }),
              speciality : new FormControl(response.speciality,{
                nonNullable : true,
                validators : Validators.required
              }),
              description : new FormControl(response.description)
            });
            this.url = this.chefService.findProfile(response.id);
          }
        )
      }
    }
  
    getFirstName(name : string) {
      return name.split(" ")[0];
    }
  
    getLastName(name : string) {
      return name.split(" ")[1];
    }
  
    onSelectFile(event : any){
      if(event.target.files){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.url = reader.result;
          this._chefForm.controls.profile.setValue(event.target.files[0]);
        }
      }
    }
  
    activeInputFile() {
      this.profile.nativeElement.click();
    }
  
    onSubmit() {
      if(this.chefId) {
        this.chefService.updateChef(
          this.chefId,
          this.generatedChefValue(),
          this.profileValue
        ).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/auth/chef']);
          }
        );
      }else {
        this.chefService.createChef(
          this.generatedChefValue(),
          this.profileValue
        ).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/auth/chef']);
          }
        );
      }
    }
  
    goBack() {
      this.location.back();
    }
    
  
    generatedChefValue() : Partial<Chef> {
      return {
        name : this.firstName + " " + this.lastName,
        birthDate : this.birthDate,
        gender : this.gender,
        speciality : this.speciality,
        description : this.description
      }
    }
  
    /* getter for chef form field*/
    get firstName() {
      return this._chefForm.controls.firstName.value;
    }
  
    get lastName() {
      return this._chefForm.controls.lastName.value;
    }
  
    get birthDate() {
      return this._chefForm.controls.birthDate.value;
    }
  
    get gender() {
      return this._chefForm.controls.gender.value;
    }
  
    get speciality() {
      return this._chefForm.controls.speciality.value;
    }
  
    get description() {
      return this._chefForm.controls.description.value;
    }
  
    get profileValue() {
      return this._chefForm.controls.profile.value;
    }
    
}
