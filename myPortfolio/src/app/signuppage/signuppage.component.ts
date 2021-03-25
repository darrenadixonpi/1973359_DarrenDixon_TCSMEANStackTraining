import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from '../userInfo-module'

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  //MUST import ReactiveFormsModule in app.module.ts
  public userInfo = userInfo;

  private storedUserInfo:any = localStorage.getItem("userData");

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  //validate the signup information
  validateSignUpInfo():boolean{
    return true;
  }

  //check for duplicate username
  checkDuplicateInfo():boolean{
    if(this.storedUserInfo != null){
      let userData = JSON.parse(this.storedUserInfo);
      console.log(userData.loginInfo.user + " : " + this.userInfo.value.loginInfo.user);
      if(userData.loginInfo.user === this.userInfo.value.loginInfo.user){
        alert("User info is a duplicate!");
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  storeUserInformation():void{
    alert("Storing User Data!");
    let userData:string = JSON.stringify(this.userInfo.value);
    console.log(userData);
    localStorage.setItem("userData",userData);
  }

  signUp():void{
    if(this.validateSignUpInfo()&&!this.checkDuplicateInfo()){
      this.storeUserInformation();
      this.router.navigate(["login"]);
    }
  }
}
