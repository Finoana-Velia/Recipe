import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../admin/service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../admin/models/Account';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit{

  @ViewChild('inputElement') inputFile ! : ElementRef;

  isActive = "profile";
  url? : string | ArrayBuffer | null;
  id! : number;

  _formUser = new FormGroup({
    profile : new FormControl(),
    personnal : new FormGroup({
      firstName : new FormControl("",{
        nonNullable : true,
        validators : Validators.required
      }),
      lastName : new FormControl(),
      birthDate : new FormControl(new Date(), {
        nonNullable : true,
        validators : Validators.required
      }),
      gender : new FormControl("",{
        nonNullable : true,
        validators : Validators.required
      })
    }),
    location : new FormGroup({
      address : new FormControl(),
      city : new FormControl(),
      provinceState : new FormControl()
    }),
    contact : new FormGroup({
      email : new FormControl("", {
        nonNullable : true,
        validators : Validators.required
      }),
      phone : new FormControl("", {
        nonNullable : true,
        validators : Validators.required
      }),
    }),
    auth : new FormGroup({
      username : new FormControl("",{
        nonNullable : true,
        validators : Validators.required
      }),
      lastPassword : new FormControl(),
      newPassword : new FormControl(),
      confirmPassword : new FormControl(),
    })
  })

  constructor(
    private userService : UserService,
    private activeRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.activeRoute.snapshot.params['id']) {
      this.id = this.activeRoute.snapshot.params['id'];
      this.userService.findById(this.id).subscribe(
        response => {
          this._formUser = new FormGroup({
            profile : new FormControl(),
            personnal : new FormGroup({
              firstName : new FormControl(response.firstName,{
                nonNullable : true,
                validators : Validators.required
              }),
              lastName : new FormControl(response.lastName),
              birthDate : new FormControl(response.birthDate, {
                nonNullable : true,
                validators : Validators.required
              }),
              gender : new FormControl(response.gender,{
                nonNullable : true,
                validators : Validators.required
              })
            }),
            location : new FormGroup({
              address : new FormControl(response.location.address),
              city : new FormControl(response.location.city),
              provinceState : new FormControl(response.location.provinceState)
            }),
            contact : new FormGroup({
              email : new FormControl(response.contact.email, {
                nonNullable : true,
                validators : Validators.required
              }),
              phone : new FormControl(response.contact.phone, {
                nonNullable : true,
                validators : Validators.required
              }),
            }),
            auth : new FormGroup({
              username : new FormControl("",{
                nonNullable : true,
                validators : Validators.required
              }),
              lastPassword : new FormControl(),
              newPassword : new FormControl(),
              confirmPassword : new FormControl(),
            })
          });
          this.url = this.userService.findProfile(response.id);
        }
      )
    }
  }

  changeActive(part : string) {
    this.isActive = part;
  }

  toggleActive(part : string) {
    const classValue = "hidden";
    if(part != this.isActive) {
      return classValue;
    }
    return 'min-h-[350px]';
  }

  activeInputFileButton() {
    this.inputFile.nativeElement.click();
  }

  onSelectChange(event : any) {
    if(event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
        this._formUser.controls.profile.setValue(event.target.files[0]);
      }
    }
  }

  onSubmit() {
    if(!this.id) {
      this.userService.createAccount(
        this.generateAccount(),
        this.profilePic
      ).subscribe(
        response => console.log(response),
        error => alert("error")
      );
    }else {
      this.userService.updateAccount(
        this.id,
        this.generateAccount(),
        this.profilePic
      ).subscribe(
        
      )
    }
  }

  generateAccount() : Partial<Account> {
    return {
      firstName : this.personnal.firstName.value,
      lastName : this.personnal.lastName.value,
      birthDate : this.personnal.birthDate.value,
      gender : this.personnal.gender.value
      ,
      contact : {
        email : this.contact.email.value,
        phone : this.contact.phone.value,
      },
      location : {
        address : this.location.address.value,
        city : this.location.city.value,
        provinceState : this.location.provinceState.value,
      },
      // auth : {
      //   username : this.security.username.value,
      //   password : this.security.newPassword.value
      // }

    }
  }
 
  get profilePic() {
    return this._formUser.controls.profile.value
  }

  get personnal() {
    return this._formUser.controls.personnal.controls;
  }

  get location() {
    return this._formUser.controls.location.controls;
  }

  get contact() {
    return this._formUser.controls.contact.controls;
  }

  get security() {
    return this._formUser.controls.auth.controls;
  }

}
