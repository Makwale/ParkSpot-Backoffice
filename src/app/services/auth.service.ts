import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  signup(signupForm: FormGroup){
    return Auth.signUp({
      username: signupForm.controls["username"].value,
      password: signupForm.controls["password"].value,
      attributes: {
        email: signupForm.controls["email"].value
      }
    })
  }

  verify(signupForm: FormGroup, verificationForm: FormGroup){
  
    return Auth.confirmSignUp(signupForm.controls["username"].value, verificationForm.controls["vcode"].value)
  }

  sigin(signinForm: FormGroup): Promise<CognitoUser>{
    return Auth.signIn(signinForm.controls["username"].value, signinForm.controls["password"].value)
  }
}
