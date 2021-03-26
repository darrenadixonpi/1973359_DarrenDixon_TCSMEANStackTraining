/*
Darren Dixon
MyPortfolio
March 24th, 2021
Login Component
*/
//ANGULAR imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//CUSTOM imports
import { MyAuthGuard } from '../MyAuthGuard';
import { loginInfo } from '../userInfo-module';
import { userList } from '../userInfoData-module';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit {

  public loginInfo = loginInfo;
  private userIndex = 0;

  constructor(public router:Router, public authService:MyAuthGuard, public userList:userList) { }

  ngOnInit(): void {
  }

  //VALIDATE the login information
  validateLoginInfo():boolean{
    this.userList.getUserList();
    let isValidated:boolean = false;
    let loginInfo = this.loginInfo;
    let userIndex = this.userIndex;
    //CHECK all user information!
    if(this.userList.userList != null){
      let userList = this.userList.userList
      userList.forEach(function (element){
        if(element.user === loginInfo.value.user && element.pass === loginInfo.value.pass){
          isValidated = true;
        }
        //IF the information has not been validated, we are still looking for the right user
        if(!isValidated){
          userIndex++;
        }
      });
    }
    this.userIndex = userIndex;
    return isValidated;
  }

  //IF validation is successful, login!
  login():void{
    if(this.validateLoginInfo()){
      localStorage.setItem("loggedInToken",this.loginInfo.value.user);
      localStorage.setItem("userIndex",this.userIndex.toString());
      this.router.navigate(["home"]);
      this.authService.changeActivation();
    }else{
      alert("Wrong information, please try again!")
    }
  }
}
