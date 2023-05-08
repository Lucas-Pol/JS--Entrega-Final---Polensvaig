let numberDisc = 0;
let finalPrice = 0;
let discName = "disc1"; //this value can be changed to "disc1", "disc2" or "disc3" to test the function 

//disc prices
let priceDisc1 = 100;
let priceDisc2 = 200;
let priceDisc3 = 300;



//new purchase function
function newPurchase (){
    let name = discName;
    numberDisc ++;
    switch (name) {
        case "disc1":
            finalPrice = numberDisc * priceDisc1;
            console.log("Compraste: " + numberDisc + " discos, por un total de $" + finalPrice);
            break;
            
        case "disc2":
            finalPrice = numberDisc * priceDisc2;
            console.log("Compraste: " + numberDisc + " discos, por un total de $" + finalPrice);            
            break;

        case "disc3":
            finalPrice = numberDisc * priceDisc3;
            console.log("Compraste: " + numberDisc + " discos, por un total de $" + finalPrice);            
            break;

        default:
            break;
    }
}




//clear function
function clearCart (){
    numberDisc = 0;
    finalPrice = 0;
    console.log("Compraste: " + numberDisc + " discos, por un total de $" + finalPrice);
};


