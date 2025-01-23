import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChefService } from '../../service/chef.service';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Chef, Gender } from '../../model/chef';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './chef-form.component.html',
  styleUrl: './chef-form.component.css'
})
export class ChefFormComponent {

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
    specialities : new FormControl([],{
      nonNullable : true,
      validators : Validators.required
    }),
    description : new FormControl("")
  });

  constructor(
    private chefService : ChefService,
    private router : Router
  ) {}

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
    // console.log("Chef recieved");
    // console.log(this.generatedChefValue());
    this.chefService.createChef(
      this.generatedChefValue(),
      this.profileValue
    ).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/auth/chef']);
      }
    )
  }

  generatedChefValue() : Partial<Chef> {
    return {
      name : this.firstName + " " + this.lastName,
      birthDate : this.birthDate,
      gender : this.gender,
      specialities : this.specialities,
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

  get specialities() {
    return this._chefForm.controls.specialities.value;
  }

  get description() {
    return this._chefForm.controls.description.value;
  }

  get profileValue() {
    return this._chefForm.controls.profile.value;
  }
}
