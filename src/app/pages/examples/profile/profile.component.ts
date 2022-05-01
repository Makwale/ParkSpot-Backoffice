import { Component, OnInit, DoCheck } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";
@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html"
})
export class ProfileComponent implements OnInit, DoCheck {
  profileForm: FormGroup;

  userId: string;

  isEdit = false;
  
  isCreated: boolean = false;

  isUpdating: boolean = false;

  constructor(private as: AuthService, private dbs: DatabaseService, 
    private router: Router, public acs: AccountService) {}

  ngOnInit() {
    this.profileForm = new FormBuilder().group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      phone: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      homeAddress: [''],
      city: [''],
      postalCode: [''],
    });
    
    if(this.acs.user){
      if(this.acs.user.address == undefined){
        swal.fire({
          title: "Please complete your profile",
          text: "There are some missing information",
          icon: "error",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger"
          }
        });
      }
      this.profileForm.controls["firstname"].setValue(this.acs.user.firstname);
      this.profileForm.controls["lastname"].setValue(this.acs.user.lastname);
      this.profileForm.controls["phone"].setValue(this.acs.user.phone);
      this.profileForm.controls["email"].setValue(this.acs.user.email);
      this.profileForm.controls["homeAddress"].setValue(this.acs.user.address ? this.acs.user.address.homeAddress : "");
      this.profileForm.controls["city"].setValue(this.acs.user.address ? this.acs.user.address.city : "");
      this.profileForm.controls["postalCode"].setValue(this.acs.user.address ? this.acs.user.address.postalCode : 0);

    }
    

  }

  ngDoCheck(){
    
    if(!this.isEdit){
      if(this.acs.user){
        this.profileForm.controls["firstname"].setValue(this.acs.user.firstname);
        this.profileForm.controls["lastname"].setValue(this.acs.user.lastname);
        this.profileForm.controls["phone"].setValue(this.acs.user.phone);
        this.profileForm.controls["email"].setValue(this.acs.user.email);
        this.profileForm.controls["homeAddress"].setValue(this.acs.user.address ? this.acs.user.address.homeAddress : "");
        this.profileForm.controls["city"].setValue(this.acs.user.address ? this.acs.user.address.city : "");
        this.profileForm.controls["postalCode"].setValue(this.acs.user.address ? this.acs.user.address.postalCode : 0);
      }
    }
    
  }

  updateProfile(){
   
    this.isCreated = true;

    if(this.isEdit){
      this.isUpdating = true;
      this.dbs.updateUser(this.profileForm).subscribe(res => {

        this.isUpdating = false;
        this.isCreated = false;
        this.isEdit = !this.isEdit;
        swal.fire({
          title: "Success",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success"
          }
        });
      })
     
    }else{
      this.isEdit = !this.isEdit;
      this.isUpdating = false;
      this.isCreated = false;
    }
   

  }
}
