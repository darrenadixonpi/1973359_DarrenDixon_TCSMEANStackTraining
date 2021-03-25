import { Component } from '@angular/core';
import { MyAuthGuard } from './MyAuthGuard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService:MyAuthGuard){

  }

  title = 'myPortfolio';

  logout():void{
    if(localStorage.getItem("loggedInToken") != null){
      localStorage.removeItem("loggedInToken");
      this.authService.changeActivation();
      alert("Successfully logged out!");
    }else{
      alert("You must log in before you can log out!");
    }
  }
}
