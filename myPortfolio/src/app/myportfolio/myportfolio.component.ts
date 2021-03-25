import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { contactInfo } from '../contactInfo-module';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.component.html',
  styleUrls: ['./myportfolio.component.css']
})
export class MyportfolioComponent implements OnInit {
  
  public contactInfo = contactInfo;
  private storedContactInfo:Array<string> = [];
  private fillerExists:boolean = false;
  public buttonType:string = "";
  private contactInteraction = "";

  constructor() {
    if(localStorage.getItem("contactData") != null){
      this.storedContactInfo = JSON.parse(localStorage.getItem("contactData") as string);
    }
  }

  ngOnInit(): void {
  }

  //validate the contact information
  validateContactInfo():boolean{
    if(this.contactInfo.value.name !== null && this.contactInfo.value.email !== null && this.contactInfo.value.phoneNumber !== null){
      return true;
    }
    alert("All contact fields must have input!");
    return false;
  }

  //check for duplicate username
  checkDuplicateInfo():boolean{
    if(this.storedContactInfo != null){
      let isDuplicate:boolean = false;
      let contactName = this.contactInfo.value.name;
      
      this.storedContactInfo.forEach(function (element){
        let tempContact = JSON.parse(element);
        if(contactName === tempContact.name){
          isDuplicate = true;
        }
      });
      return isDuplicate;
    }else{
      alert("Duplicate contact name!");
      return false;
    }
  }

  storeContactInfo():void{
    alert("Storing Contact Data!");
    let contactData:string = JSON.stringify(this.contactInfo.value);
    console.log(contactData);
    this.storedContactInfo.push(contactData);
    localStorage.setItem("contactData",JSON.stringify(this.storedContactInfo));
  }

  addContact():void{
    if(!this.checkDuplicateInfo()&&this.validateContactInfo()){
      this.storeContactInfo();
      this.contactInteraction = "add";
    }else{
      alert("Cannot add a contact!");
    }
  }

  submittedContactInfo(buttonType:string):void{
    this.buttonType = buttonType;
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
    let tempContact = {
        name: "",
        email: "",
        phoneNumber: 0
    };
    let contactDataArray = this.storedContactInfo;
    //SEARCH contact data for the contact; if we find it, remove it
    contactDataArray.forEach(function (element){
        tempContact = JSON.parse(element);
        if(tempContact.name == contactName){
            contactDataArray.splice(count,1);
        }
        count++;
    });

    //RE-STORE the new contact array in local storage
    localStorage.setItem("contactData",JSON.stringify(contactDataArray));
    //remove the contact on the contact table and re-display the table
    this.contactInteraction = "deleted";
    this.displayContacts();
  }

  displayTable(body:HTMLElement):void{

    let component = this;
    if(((this.contactInteraction === "added" && this.storedContactInfo.length > 1) || this.contactInteraction === "deleted" || this.contactInteraction === "view")
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
    let tempContactName = "";
    let tempContactEmail = "";
    let tempContactNumber = 0;
    let tempContact = {
        name: "",
        email: "",
        phoneNumber: 0
    };

    //for each contact object, add it to the table HTML
    this.storedContactInfo.forEach(function (element) {
      //CREATE and populate contact object
      tempContact = JSON.parse(element);
      tempContactName = tempContact.name;
      tempContactEmail = tempContact.email;
      tempContactNumber = tempContact.phoneNumber;

      //CREATE a new row
      tableRow = document.createElement("tr");
      //add contact name
      tableData = document.createElement("th");
      tableData.textContent = tempContactName.toString();
      tableData.scope = "row";
      tableRow.appendChild(tableData);        
      //add contact email
      tableData = document.createElement("td");
      tableData.textContent = tempContactEmail;
      tableRow.appendChild(tableData);
      //add contact phone number
      tableData = document.createElement("td");
      tableData.textContent = tempContactNumber.toString();
      tableRow.appendChild(tableData);
      //add remove button
      tableData = document.createElement("td");
      let checkoutDeleteButton = document.createElement("a");
      checkoutDeleteButton.className = "btn btn-primary";
      checkoutDeleteButton.textContent = "X";
      checkoutDeleteButton.onclick = function(){component.deleteItem(JSON.parse(element).name);}
      tableData.appendChild(checkoutDeleteButton);
      tableRow.appendChild(tableData);

      //APPEND row to table
      tableBody.appendChild(tableRow);
      table.appendChild(tableBody);
      //APPEND table to the body
      body.appendChild(table);
    });
  }

  //display the filler message
  displayFillerMessage(body:HTMLElement):void{
    let fillerMessage = document.createElement("div");
    fillerMessage.id = "fillerMessage"
    fillerMessage.textContent = "Oh no, you don't have any contacts!";
    body.appendChild(fillerMessage);
    this.fillerExists = true;
  }

  //display the contacts
  displayContacts():void{
    //need main container to add or remove elements to the page
    let body = document.getElementById("contactContent") as HTMLElement;

    //If the filler message is displayed, remove it
    if(this.fillerExists){
      body.removeChild(document.getElementById("fillerMessage") as HTMLElement);
      this.fillerExists = false;
    }

    //If we are viewing an empty table, display the filler message
    if(this.contactInteraction === "view" && this.storedContactInfo.length == 0){
      this.displayFillerMessage(body);
    }

    //IF there is any contact data, display it
    if (localStorage.getItem("contactData") != null && this.storedContactInfo.length != 0) {
        this.displayTable(body);
    }
    //ELSE display a filler message
    else if(this.contactInteraction !== "view") {
        if(this.contactInteraction === "deleted"){
            body.removeChild(body.getElementsByTagName("table")[0]);
        }
        this.displayFillerMessage(body);
    }
  }
}
