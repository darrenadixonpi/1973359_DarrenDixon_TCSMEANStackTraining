/*
Darren Dixon
MyPortfolio
March 24th, 2021
Main App Component
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthGuard } from './MyAuthGuard';
import { userList } from './userInfoData-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService:MyAuthGuard, public userList:userList, public router:Router){

  }

  title = 'myPortfolio';

  logout():void{
    if(localStorage.getItem("loggedInToken") != null){
      localStorage.removeItem("loggedInToken");
      localStorage.removeItem("userIndex");
      this.authService.changeActivation();
      alert("Successfully logged out!");
      this.router.navigate(['/home']);
    }else{
      alert("You must log in before you can log out!");
    }
  }

  

}
