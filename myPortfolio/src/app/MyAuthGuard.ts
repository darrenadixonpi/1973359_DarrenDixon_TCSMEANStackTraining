import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class MyAuthGuard implements CanActivate{

    //gets called each page-refresh so that login remains consistent
    private activated = this.canActivate();

    isActive():boolean{
        return this.activated;
    }

    changeActivation():void{
        this.activated = !this.activated;
    }

    canActivate():boolean{
        return (localStorage.getItem("loggedInToken") != null);
    }
}