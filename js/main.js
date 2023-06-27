// Setting variables
let finalPrice = 0;
let cart = [];


// Disc array
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

//Creates the disc cards
function createDiscCard(){
  fetch("dataBase.json")
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    const discWrapper = document.getElementById("disc-wrapper");

    data.forEach(disc => {
      const column = document.createElement("div");
      column.className = "col-3 mt-4";

      const card = document.createElement("div");
      card.className = "card";
      card.style = "width: 18rem";

      const img = document.createElement("img");
      img.src = `${disc.foto}`;
      img.className = "card-img-top";
      img.alt = "cd";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = `${disc.nombre} - $${disc.precio}`;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-primary";
      button.setAttribute("onclick", `addProd(${disc.id})`);
      button.textContent = "Agregar";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(button);

      card.appendChild(img);
      card.appendChild(cardBody);

      column.appendChild(card);

      discWrapper.appendChild(column);

      });
  })

  .catch(er => {
    console.log("Este es el error: ", er);
  })
}

document.addEventListener("DOMContentLoaded", ()=>{
  createDiscCard();
})



// Add to cart
function addProd(id) {
  const selectedDisc = cds.find(disc => disc.id === id);
  if (selectedDisc) {
    cart.push(selectedDisc);
    finalPrice += selectedDisc.price;
    updateCartText(finalPrice);
  }
}

// Update cart text
function updateCartText(price) {
  const cartText = document.getElementById("carro");
  const itemCount = cart.length;
  cartText.textContent = `En el carrito hay: ${itemCount} discos por un valor de $ ${price}`;
}

// Open purchase modal
function openModal() {
  $('#formularioCompra').modal('show');
}

// Purchase function
function realizarCompra() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const direccion = document.getElementById('direccion').value;
  const email = document.getElementById('email').value;
  const descuento = document.getElementById('descuento').value;

let checkOutMsg = (value)=>{
  Swal.fire({
    title: 'Tu compra finalizó con éxito!',
    icon: 'success',
    text: `Estimado ${nombre} ${apellido}, el monto a pagar es de $ ${value} y se enviará la factura a ${email}.`,
    confirmButtonText: 'Cerrar',
  }).then(()=>{
    //aca ejecuto el clear function dsp del update
  }).then(()=>{
    updateCartText(value);   
  })
}

if (!nombre || !apellido || !direccion || !email) {
    console.log("Por favor completa todos los campos del formulario.");
    return;
  } 

if(descuento){
    let priceWithDiscount = finalPrice;
    $('#formularioCompra').modal('hide');
    switch (descuento) {
    case "DESC10":
      priceWithDiscount *= 0.9;
      saveStorage(priceWithDiscount);
      checkOutMsg(priceWithDiscount);      
      break;
    case "DESC20":
      priceWithDiscount *= 0.8;
      saveStorage(priceWithDiscount);
      checkOutMsg(priceWithDiscount);
      break;
    case "DESC30":
      priceWithDiscount *= 0.7;
      saveStorage(priceWithDiscount);
      checkOutMsg(priceWithDiscount);
      break;
    default:
        Swal.fire({
        title: 'El código de descuento ingresado no es válido',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      }).then(()=>{
        $('#formularioCompra').modal('show');
      });
      break;
  }} else {
    saveStorage(finalPrice);
    $('#formularioCompra').modal('hide');
    checkOutMsg(finalPrice);
  } 
}

//Save in local storage
function saveStorage(price){
  const purchase = {
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    email: email,
    cart: cart,
    total: price,
  };
  const purchaseJSON = JSON.stringify(purchase);
  localStorage.setItem('compra', purchaseJSON);
  
}

// Clear cart
function clearCart() {
  finalPrice = 0;
  cart = [];
  updateCartText(); //EL CARRITO ME TIRA UNDEFINED
  //borrar el local storage al haber  comprado y al vaciar carro
  }





/* 



5) al ejecutar la clear function (tanto por haber comprado como por vaciar el carro), borrar el localstorage y el carrito me tira UNDEFINED


9) CHEQUEAR LOS "ONCLICK - addprod" de los botones de las cards
10) ver de agregar un mensaje de que se aplicó el descuento, en el sweet alert


opcional:
- si el carrito está vacío al apretar "comprar" que tiré cartel de error (sweetalert)
- tunear un poco la web (cambiar fotos de cd's, poner algun fondito)
- ver de agregar boton de "quitar" al card de los cd's

*/