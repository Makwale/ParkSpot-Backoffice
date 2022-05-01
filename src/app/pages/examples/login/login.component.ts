import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  isCreated: boolean = false;

  constructor(private as: AuthService, private dbs: DatabaseService, private router: Router,
    private acs: AccountService) { }

  ngOnInit(): void {
    this.signinForm = new FormBuilder().group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      password: ['', [Validators.minLength(8),Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}')]],
    })

  }



  signin(){
    this.isCreated = true;
    this.as.sigin(this.signinForm).then(results => {
      
      localStorage.setItem("token", results.getSignInUserSession().getIdToken().getJwtToken())
        //Sub is used as user primary key in a database


      this.dbs.getUser(results["attributes"].sub).valueChanges.subscribe(response => {

        // User physical address
        let address: Address = undefined;
      
        if(response.data["user"]["address"][0] != undefined){
            if( response.data["user"]["address"][0]["homeAddress"] != undefined &&
              response.data["user"]["address"][0]["city"] != undefined &&
              response.data["user"]["address"][0]["postalCode"] != undefined){
  
              address = response.data["user"]["address"][0];
  
            }
              
        }

          let client : Client = response.data["user"]["client"][0];

          let user = new User(results["attributes"].sub,results["username"], 
          response.data["user"]["firstname"], response.data["user"]["lastname"],
          response.data["user"]["email"], response.data["user"]["phone"], address, client)

          this.isCreated = false;

          this.acs.user = user;

          this.acs.loginStatus = true;
          
          this.router.navigateByUrl("examples")

        // This line of code will be changed later on
        
      })

    
    }).catch(error => {
      this.isCreated = false;
      swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger"
        }
      });
    })
  }

}
