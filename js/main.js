/* 
   1) El usuario va a utilizar la función addProd para pushear al array cart los discos que quiere
   2) el usuario utilizará la función newPurchase para empezar a finalizar la compra, en esta le dará la posibilidad de ingresar un código de descuento a través de un prompt. La función validará que el código de descuento exista, cuál es y calculará el precio final para así activar la función checkout
   3) la función checkout tomará los datos del cliente a través de prompt y devolverá un alert de compra finalizada

*/


let numberDisc = 0;
let finalPrice = 0;
let discName = "disc1"; //this value can be changed to "disc1", "disc2" or "disc3" to test the function 


//sales cart array
let cart = [];


//disc array

let cds = [
    {
        id: 1,
        discName: "La cumbia del ciclo",
        price: 100,
    },
    {
        id: 2,
        discName: "Binomio",
        price: 200,
    },
    {
        id: 3,
        discName: "Ana María",
        price: 300,
    },
];



//discount code

let discountCodeArray = ["DESC10", "DESC20", "DESC30"];
let discountCode = "";




//add to cart

function addProd (){ 
    //pushear el producto seleccionado al array carrito
    //ir calculando el precio total de la compra al momento
}


//checkout function
function checkout (){
    //esta funcion es la que le va a cobrar a la persona
    //finalPrice
    //pedir datos del usuario por prompt para completar la compra
    //alert de compra finalizada
    //resetear las variables a 0
}

//new purchase function
function newPurchase (){
    
    //abrir prompt para imputear el código de descuento si lo tiene y guardar en discountCode
    if (discountCode) { //validar si tiene descuento 
        //validar qué tipo de descuento es
        switch (discountCode) {
            case DESC10:
                //calcular descuento y precio final
                checkout (finalPrice);
                break;
            case DESC20:
                //calcular descuento y precio final
                checkout (finalPrice);
                break;
            case DESC30:
                //calcular descuento y precio final
                checkout (finalPrice);
                break;
            default:
                alert("Tu código de descuento no es válido y te cobraremos el total de: $ ${finalPrice}")
                checkout (finalPrice);
                break;
        }
    } else {
        checkout (finalPrice);
    }
}



//clear function
function clearCart (){
    numberDisc = 0;
    finalPrice = 0;
    console.log("Compraste: " + numberDisc + " discos, por un total de $" + finalPrice);
};






