/*
Darren Dixon
Cart Management
March 19th, 2021 
View Shop script
*/

//item creation function
function createItemObject(itemName:string, itemQuantity:number, itemPrice:number){
    let itemObject = {
        itemName: itemName,
        itemQuantity: itemQuantity,
        itemPrice: itemPrice
    };

    return itemObject;
}

//store item object into the array of other team budget objects from the session
function addToCart(itemNumber:string){

    //create new item object
    let itemName = document.getElementById("itemName"+itemNumber).textContent;
    let itemQuantity = parseInt((document.getElementById("itemQuantity"+itemNumber) as HTMLInputElement).value);
    let itemPrice = parseFloat(document.getElementById("itemPrice"+itemNumber).textContent);
    let itemObject = createItemObject(itemName,itemQuantity,itemPrice);

    //if the item quantity is not NaN, add the item!
    if(!isNaN(itemQuantity)){
        //if the cart data exists, read and add onto it
        if(localStorage.getItem("cartData") != null){
            //console.log("Is not null.");
            //we want to also look for duplicate items
            let tempCartArray = JSON.parse(localStorage.getItem("cartData"));
            let count = 0;
            let tempItem = {
                itemName: "",
                itemQuantity: 0,
                itemPrice: 0.0
            };

            //if we find a duplicate item, remove it and add the quantity to the new item
            tempCartArray.forEach(function (element){
                tempItem = JSON.parse(element);
                if(tempItem.itemName == itemName){
                    //console.log("Old cart: "+tempCartArray);
                    itemQuantity += tempItem.itemQuantity;
                    itemObject = createItemObject(itemName,itemQuantity,itemPrice);
                    tempCartArray.splice(count,1);
                }
                count++;
            });

                //add new item to the cart
                tempCartArray.push(JSON.stringify(itemObject));
                //console.log("New cart: "+tempCartArray);
                localStorage.setItem("cartData",JSON.stringify(tempCartArray));

        //otherwise, create the item object array
        }else{
            //console.log("Is null.");
            let tempCartArray = [];

            //add new item to the cart
            tempCartArray.push(JSON.stringify(itemObject));
            localStorage.setItem("cartData",JSON.stringify(tempCartArray));
        }
    }
}

//When an item gets added to the cart, add it to the cart!
let buttons = document.getElementsByName("addToCart");
Array.from(buttons).forEach(function (element){
    let parentElement = element.parentElement;
    //console.log(parentElement.id);
    element.onclick = function(){addToCart(parentElement.id);}
});