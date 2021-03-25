import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { loginInfo } from '../userInfo-module';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public loginInfo = loginInfo;
  
  private storedUserInfo:any = localStorage.getItem("userData");

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  //validate the login information
  validateLoginInfo():boolean{
    if(this.storedUserInfo != null){
      let userData = JSON.parse(this.storedUserInfo);
      console.log(userData.login.user + " : " + userData.login.pass);
      if(this.loginInfo.value.user === userData.login.user && this.loginInfo.value.pass === userData.login.pass){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  login():void{
    if(this.validateLoginInfo()){
      alert("Successfully logged in!")
      this.router.navigate(["myportfolio"]);
    }else{
      alert("Wrong information, please try again!")
    }
  }
}
