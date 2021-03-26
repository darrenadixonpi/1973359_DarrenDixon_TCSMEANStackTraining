/*
Darren Dixon
MyPortfolio
March 24th, 2021
Sign Up Component
*/
//ANGULAR imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//CUSTOM imports
import { userInfo } from '../userInfo-module';
import { userList, userInfoInterface} from '../userInfoData-module';


@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  //MUST import ReactiveFormsModule in app.module.ts
  public userInfo = userInfo;

  constructor(public router:Router, public userList:userList) { }

  ngOnInit(): void {
  }

  //VALIDATE the signup information
  validateSignUpInfo():boolean{
    let userInfo = this.userInfo.value;
    return (userInfo.loginInfo.user !== null && userInfo.loginInfo.pass !== null && userInfo.name.first !== null && userInfo.name.second !== null);
  }

  //CHECK for duplicate username
  checkDuplicateInfo():boolean{
    let isDuplicate:boolean = false;
    let userInfo = this.userInfo;
    let userList = this.userList;
    userList.getUserList();
    if(this.userList.userList.length !== 0){
      this.userList.userList.forEach(function (element){
        if(userInfo.value.loginInfo.user === element.user){
          isDuplicate = true;
        }
      })
    }
    return isDuplicate;
  }

  //STORE user information
  storeUserInformation():void{
    alert("Storing User Data!");
    let user:userInfoInterface = {
      user:this.userInfo.value.loginInfo.user,
      pass:this.userInfo.value.loginInfo.pass,
      firstName:this.userInfo.value.name.first,
      lastName:this.userInfo.value.name.last,
      contactList:[]
    };

    this.userList.userList.push(user);
    this.userList.setUserList();
    console.log(this.userList.userList);
  }

  //SIGN up!
  signUp():void{
    //IF the infromation is validated and not a duplicate, store the new user information
    if(this.validateSignUpInfo()&&!this.checkDuplicateInfo()){
      this.storeUserInformation();
      this.router.navigate(["login"]);
    }
  }
}
