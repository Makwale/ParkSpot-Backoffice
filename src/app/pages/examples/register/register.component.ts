import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  signupForm: FormGroup;

  verificationForm: FormGroup;

  isVerificationFormVisible: boolean;

  userId: string;

  isCreated: boolean = false;

  constructor(private as: AuthService, private dbs: DatabaseService, private router: Router) { 

    this.userId = "";

    this.isVerificationFormVisible = false;
  }

  ngOnInit(): void {

    // Sign up inputs
    this.signupForm = new FormBuilder().group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.minLength(8),Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}')]],
    })

    // Verification input
    this.verificationForm = new FormBuilder().group({
      vcode: [''],
    })
  }

  signup(){
    
    this.isCreated = true;

    this.as.signup(this.signupForm).then(results => {
      this.userId = results.userSub;
      swal.fire({
        title: "Verification Code",
        text: "Verification code is sent to your email",
        icon: "info",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-info"
        }
      });
  
      this.isCreated = false;
      this.isVerificationFormVisible = !this.isVerificationFormVisible
    }).catch(error => {
      this.isCreated = false;
      swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger"
        }
      });
    });

  }

  verify(){
    
    this.isCreated = true;
    
    this.as.verify(this.signupForm, this.verificationForm).then( results => {

     
      this.dbs.addUser(this.signupForm, this.userId).subscribe(respose => {
        

        this.dbs.addClient(this.userId).subscribe(res => {
   
          this.dbs.addUserAddress(this.userId).subscribe( res => {
            swal.fire({
              title: "Success",
              text: "Account is created",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success"
              }
            });
            this.isCreated = false;
            this.router.navigateByUrl("examples/login")
            this.isVerificationFormVisible = !this.isVerificationFormVisible
          })
          
        })
   
      })
    }).catch(error => {
      
      this.isCreated = false;
      
      swal.fire({
        title: "Error",
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
