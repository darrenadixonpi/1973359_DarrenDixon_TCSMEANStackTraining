/*
Darren Dixon
Cart Management
March 19th, 2021
Checkout script
*/
//DELETE item on cart
function deleteItem(itemName) {
    //INITIALIZE empty object and get cart data
    let cartData = JSON.parse(localStorage.getItem("cartData"));
    let count = 0;
    let tempItem = {
        itemName: "",
        itemQuantity: 0,
        itemPrice: 0.0
    };
    //SEARCH cart data for the item; if we find it, remove it
    cartData.forEach(function (element) {
        tempItem = JSON.parse(element);
        if (tempItem.itemName == itemName) {
            cartData.splice(count, 1);
        }
        count++;
    });
    //RE-STORE the new array data in local storage
    localStorage.setItem("cartData", JSON.stringify(cartData));
    //remove the item on the cart table and re-display the table
    isThereACart(true);
}
/*
script used to populate the checkout table.
NOTE: whenever we add an element to the table, we must reinitialize the element before adding a new one
instead of initlializing the element once. If we do not, it will only change the element instead of
allowing us to append "new children" from a single "element".
*/
function getCartData(deletedItem) {
    //body container element
    let body = document.getElementById("bodyContent");
    if (deletedItem) {
        //console.log(JSON.parse(localStorage.getItem("cartData")));
        body.removeChild(body.getElementsByTagName("table")[0]);
        //console.log("Removed table!");
    }
    //CREATE all table elements
    let checkoutTable = document.createElement("table");
    checkoutTable.id = "checkout";
    checkoutTable.className = "table";
    //table row
    let checkoutRow = document.createElement("tr");
    //table headers
    let checkoutTableHead = document.createElement("thead");
    let checkoutHead = document.createElement("th");
    checkoutHead.scope = "col";
    //table data
    let checkoutTableBody = document.createElement("tbody");
    let checkoutData = document.createElement("td");
    //ADD table headers
    checkoutHead.textContent = "#";
    checkoutRow.appendChild(checkoutHead);
    checkoutHead = document.createElement("th");
    checkoutHead.scope = "col";
    checkoutHead.textContent = "Name";
    checkoutRow.appendChild(checkoutHead);
    checkoutHead = document.createElement("th");
    checkoutHead.scope = "col";
    checkoutHead.textContent = "Quantity";
    checkoutRow.appendChild(checkoutHead);
    checkoutHead = document.createElement("th");
    checkoutHead.scope = "col";
    checkoutHead.textContent = "Price";
    checkoutRow.appendChild(checkoutHead);
    checkoutHead = document.createElement("th");
    checkoutHead.scope = "col";
    checkoutHead.textContent = "Remove";
    checkoutRow.appendChild(checkoutHead);
    checkoutTableHead.appendChild(checkoutRow);
    checkoutTable.appendChild(checkoutTableHead);
    //CREATE an empty object to populate the item data as we retrieve it.
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    let tempItemName = "";
    let tempItemNumber = 0;
    let tempItemQuantity = 0;
    let tempItemPrice = 0.0;
    let totalPrice = 0.0;
    let tempItem = {
        itemName: "",
        itemQuantity: 0,
        itemPrice: 0.0
    };
    //for each item object, add it to the table HTML
    cartData.forEach(function (element) {
        tempItemNumber++;
        //CREATE and populate item object
        tempItem = JSON.parse(element);
        tempItemName = tempItem.itemName;
        tempItemQuantity = tempItem.itemQuantity;
        tempItemPrice = tempItem.itemPrice;
        //increment total price of all items
        totalPrice += tempItemQuantity * tempItemPrice;
        //CREATE a new row
        checkoutRow = document.createElement("tr");
        //add item number
        checkoutData = document.createElement("th");
        checkoutData.textContent = tempItemNumber.toString();
        checkoutData.scope = "row";
        checkoutRow.appendChild(checkoutData);
        //add item name
        checkoutData = document.createElement("td");
        checkoutData.textContent = tempItemName;
        checkoutRow.appendChild(checkoutData);
        //add item quantity
        checkoutData = document.createElement("td");
        checkoutData.textContent = tempItemQuantity.toString();
        checkoutRow.appendChild(checkoutData);
        //add item price
        checkoutData = document.createElement("td");
        checkoutData.textContent = "$" + tempItemPrice.toString();
        checkoutRow.appendChild(checkoutData);
        //add remove button
        checkoutData = document.createElement("td");
        let checkoutDeleteButton = document.createElement("a");
        checkoutDeleteButton.className = "btn btn-primary";
        checkoutDeleteButton.textContent = "X";
        checkoutDeleteButton.onclick = function () { deleteItem(JSON.parse(element).itemName); };
        checkoutData.appendChild(checkoutDeleteButton);
        checkoutRow.appendChild(checkoutData);
        //APPEND row to table
        checkoutTableBody.appendChild(checkoutRow);
    });
    //add total price at the end of the table
    let displayTotalPrice = document.createElement("th");
    displayTotalPrice.textContent += "Total Price: $" + totalPrice.toString();
    displayTotalPrice.id = "totalPrice";
    displayTotalPrice.scope = "row";
    displayTotalPrice.colSpan = 5;
    checkoutRow = document.createElement("tr");
    checkoutRow.appendChild(displayTotalPrice);
    checkoutTableBody.appendChild(checkoutRow);
    checkoutTable.appendChild(checkoutTableBody);
    //APPEND table to the body
    body.appendChild(checkoutTable);
}
function isThereACart(itemDeleted) {
    //IF there is any cart data, display it
    if (localStorage.getItem("cartData") != null && JSON.parse(localStorage.getItem("cartData")).length != 0) {
        //console.log(JSON.parse(localStorage.getItem("cartData")).length != 0);
        getCartData(itemDeleted);
    }
    //ELSE display a filler message
    else {
        //console.log(JSON.parse(localStorage.getItem("cartData")).length != 0);
        let body = document.getElementById("bodyContent");
        if (itemDeleted) {
            body.removeChild(body.getElementsByTagName("table")[0]);
        }
        let fillerMessage = document.createElement("div");
        fillerMessage.id = "fillerMessage";
        fillerMessage.textContent = "Oh no, you don't have any items! If you want to purchase some items, navigate to the \"View Shop\" page!";
        body.appendChild(fillerMessage);
    }
}
//start the script
isThereACart(false);
