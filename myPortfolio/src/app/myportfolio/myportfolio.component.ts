/*
Darren Dixon
MyPortfolio
March 24th, 2021
MyPortfolio Component
*/
//Angular imports
import { Component, OnInit } from '@angular/core';
//user-defined imports
import { contactInfo } from '../contactInfo-module';
import { userList} from '../userInfoData-module';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.component.html',
  styleUrls: ['./myportfolio.component.css']
})
export class MyportfolioComponent implements OnInit {
  
  //PUBLIC: will be changed by HTML forms, PRIVATE: will only be changed by this class
  public contactInfo = contactInfo;
  private userIndex:number = parseInt(localStorage.getItem("userIndex") as string);
  private fillerExists:boolean = false;
  public buttonType:string = "";
  private contactInteraction = "";
  private user = localStorage.getItem("loggedInToken") as string;

  //user-defined module service (userList) must go in default constructor
  constructor(public userList:userList) {

  }

  ngOnInit(): void {
  }

  //This is used in HTML to get the user, since it is private.
  getUser():string{
    return this.user;
  }

  //VALIDATE the contact information: just make sure they are all not null for now.
  validateContactInfo():boolean{
    if(this.contactInfo.value.name !== null && this.contactInfo.value.email !== null && this.contactInfo.value.phoneNumber !== null){
      return true;
    }
    return false;
  }

  //CHECK for duplicate contact name
  checkDuplicateInfo():boolean{
    //ASSUME there isn't one
    let isDuplicate:boolean = false;
    //IF the contact list is not empty, iterate through it
    let contactList = this.userList.userList[this.userIndex].contactList; 
    if(contactList != null){
      let contactName = this.contactInfo.value.name;
      //ITERATION
      contactList.forEach(function(element){
        //IF we find the contact name, there is a duplicate
        if(element.name === contactName){
          isDuplicate = true;
        }
      });
    }
    return isDuplicate;
  }

  //STORE contact information
  storeContactInfo():void{
    let contactData = this.contactInfo.value;
    //WE must store the user information into localStorage and 
    //re-retrieve it in-case the user refreshes the page
    this.userList.userList[this.userIndex].contactList.push(contactData);
    this.userList.setUserList();
    this.userList.getUserList();
  }

  //ADD contact information
  addContact():void{
    //IF there is no duplicate contact and the contact information validates,
    //THEN add the contact
    if(!this.checkDuplicateInfo()&&this.validateContactInfo()){
      this.storeContactInfo();
      this.contactInteraction = "add";
    }else{
      this.contactInteraction = "addFailed";
      alert("Cannot add a contact! Make sure the information is right and not a duplicate name!");
    }
  }

  //SUBMIT contact information
  //MAIN function ran by the "Add Contact" button
  submittedContactInfo(buttonType:string):void{
    this.buttonType = buttonType;
    //EITHER we are viewing the contacts or adding a contact
    if(this.buttonType === "view"){
      this.contactInteraction = "view";
      this.displayContacts();
    }else if(this.buttonType === "submit"){
      this.addContact();
      this.displayContacts();
    }
  }

  //DELETE contact on contact array
  deleteItem(contactName:string){
    //INITIALIZE empty object and get contact data
    let count = 0;
    let contactDataArray = this.userList.userList[this.userIndex].contactList;
    //SEARCH contact data for the contact; if we find it, remove it
    contactDataArray.forEach(function (element){
        if(element.name == contactName){
            contactDataArray.splice(count,1);
        }
        count++;
    });

    //RE-STORE the new contact array in local storage
    this.userList.setUserList();
    //remove the contact on the contact table and re-display the table
    this.contactInteraction = "deleted";
    this.displayContacts();
  }

  //DISPLAY the contacts table
  displayTable(body:HTMLElement):void{
    //FOR easier reading
    let component = this;
    let storedContactInfo = component.userList.userList[component.userIndex].contactList;
    if(((component.contactInteraction === "added" && storedContactInfo.length > 1) || component.contactInteraction === "deleted" || component.contactInteraction === "view" || component.contactInteraction === "addFailed")
    && body.getElementsByTagName("table")[0] !== undefined){
      body.removeChild(body.getElementsByTagName("table")[0]);
    }
    //CREATE all table elements
    let table = document.createElement("table");
    table.id = "contacts";
    table.className = "table";
    //table row
    let tableRow = document.createElement("tr");
    //table headers
    let tableHead = document.createElement("thead");
    let tableDataHead = document.createElement("th");
    tableDataHead.scope = "col";
    //table data
    let tableBody = document.createElement("tbody");
    let tableData = document.createElement("td");

    //ADD table headers
    tableDataHead.textContent = "Name";
    tableRow.appendChild(tableDataHead);
    tableDataHead = document.createElement("th");
    tableDataHead.scope = "col";
    tableDataHead.textContent = "Email";
    tableRow.appendChild(tableDataHead);
    tableDataHead = document.createElement("th");
    tableDataHead.scope = "col";
    tableDataHead.textContent = "Phone Number";
    tableRow.appendChild(tableDataHead);
    tableHead.appendChild(tableRow);
    table.appendChild(tableHead);

    //CREATE an empty contact object to populate the contact data as we retrieve it.
    let tempContact = {
        name: "",
        email: "",
        phoneNumber: 0
    };

    //for each contact object, add it to the table HTML
    storedContactInfo.forEach(function (element) {
      //CREATE and populate contact object
      tempContact = element;

      //CREATE a new row
      tableRow = document.createElement("tr");
      //add contact name
      tableData = document.createElement("th");
      tableData.textContent = tempContact.name.toString();
      tableData.scope = "row";
      tableRow.appendChild(tableData);        
      //add contact email
      tableData = document.createElement("td");
      tableData.textContent = tempContact.email;
      tableRow.appendChild(tableData);
      //add contact phone number
      tableData = document.createElement("td");
      tableData.textContent = tempContact.phoneNumber.toString();
      tableRow.appendChild(tableData);
      //add remove button
      tableData = document.createElement("td");
      let checkoutDeleteButton = document.createElement("a");
      checkoutDeleteButton.className = "btn btn-primary";
      checkoutDeleteButton.textContent = "X";
      checkoutDeleteButton.onclick = function(){component.deleteItem(element.name);}
      tableData.appendChild(checkoutDeleteButton);
      tableRow.appendChild(tableData);

      //APPEND row to table
      tableBody.appendChild(tableRow);
      table.appendChild(tableBody);
      //APPEND table to the body
      body.appendChild(table);
    });
  }

  //DISPLAY the filler message
  displayFillerMessage(body:HTMLElement):void{
    //IF the filler message does not exist, display it
    if(!this.fillerExists){
      let fillerMessage = document.createElement("div");
      fillerMessage.id = "fillerMessage"
      fillerMessage.textContent = "Oh no, you don't have any contacts!";
      body.appendChild(fillerMessage);
    }
    this.fillerExists = true;
  }

  //DISPLAY the contacts
  displayContacts():void{
    //FOR easier reading
    let storedContactInfo = this.userList.userList[this.userIndex].contactList;
    //NEED main container to add or remove elements to the page
    let body = document.getElementById("contactContent") as HTMLElement;

    //IF the filler message is displayed, remove it
    if(this.fillerExists){
      body.removeChild(document.getElementById("fillerMessage") as HTMLElement);
      this.fillerExists = false;
    }

    //IF there is any contact data, display it
    if (storedContactInfo != undefined && storedContactInfo.length != 0) {
      this.displayTable(body);
    }
    //ELSE display a filler message
    else if(this.contactInteraction === "deleted"){
        body.removeChild(body.getElementsByTagName("table")[0]);
        this.displayFillerMessage(body);
    }else{
      this.displayFillerMessage(body);
    }
  }
}
