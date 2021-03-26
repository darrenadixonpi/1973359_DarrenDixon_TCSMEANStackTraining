/*
Darren Dixon
MyPortfolio
March 24th, 2021
MyAuthGuard
*/
//ANGULAR imports
import { Injectable } from "@angular/core";
import { CanActivate,CanDeactivate } from "@angular/router";

//AUTHGUARD, we also want to use this globally throughout the components,
//HENCE we should use IOC with DI
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