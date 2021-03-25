import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthGuard } from '../MyAuthGuard';
import { loginInfo } from '../userInfo-module';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public loginInfo = loginInfo;
  
  private storedUserInfo:any = localStorage.getItem("userData");

  constructor(public router:Router, public authService:MyAuthGuard) { }

  ngOnInit(): void {
  }

  //validate the login information
  validateLoginInfo():boolean{
    if(this.storedUserInfo !== null && (loginInfo.value.user !== null || loginInfo.value.pass !== null)){
      let userData = JSON.parse(this.storedUserInfo);
      console.log(userData.loginInfo.user + " : " + userData.loginInfo.pass);
      if(this.loginInfo.value.user === userData.loginInfo.user && this.loginInfo.value.pass === userData.loginInfo.pass){
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
      alert("Successfully logged in!");
      localStorage.setItem("loggedInToken","true");
      this.router.navigate(["home"]);
      this.authService.changeActivation();
    }else{
      alert("Wrong information, please try again!")
    }
  }
}
