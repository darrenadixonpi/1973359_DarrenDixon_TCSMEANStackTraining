/*
Darren Dixon
MyPortfolio
March 24th, 2021
Contact Info FormGroup Module 
*/
import { FormControl, FormGroup } from '@angular/forms';

/*
    We want to be able to import this FormGroup to be used
    in the portfolio page to display and edit the users' contacts
*/
export var contactInfo = new FormGroup({
    name:new FormControl(),
    email:new FormControl(),
    phoneNumber:new FormControl()
});