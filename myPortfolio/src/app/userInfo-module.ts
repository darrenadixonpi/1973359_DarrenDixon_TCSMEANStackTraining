/*
Darren Dixon
MyPortfolio
March 24th, 2021
User FormGroup Module
*/
import { FormControl, FormGroup } from '@angular/forms';

/*
    We want to be able to import these FormGroups into
    our login and signup pages to be used as "classes"
    that we can use to interact with the users' data
*/


export var loginInfo = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()    
})

export var userInfo = new FormGroup({
    name:new FormGroup({
      first:new FormControl(),
      last:new FormControl()
    }),
    loginInfo
  });