/*
Darren Dixon
MyPortfolio
March 24th, 2021
User List Module
*/
import { Injectable } from '@angular/core';

/*
    We want to use IOC to keep data for users stored instead of localStorage!
    NOTE: When I went to implement this, the data would disappear on page-refresh.
    To get around this, I am temporarily implementing the localStorage just for the userList data.
*/

export interface contactInfoInterface {
    name:string;
    email:string;
    phoneNumber:number;
}

export interface userInfoInterface {
    user:string;
    pass:string;
    firstName:string;
    lastName:string;
    contactList:contactInfoInterface[];
}

@Injectable()
export class userList{

    public userList:userInfoInterface[] = this.getUserList();

    getUserList():userInfoInterface[]{
        let userList = JSON.parse(localStorage.getItem("userList") as string);
        if(userList === null){
            return [];
        }else{
            return userList;
        }
    }

    setUserList(){
        localStorage.setItem("userList",JSON.stringify(this.userList));
    }
    
}