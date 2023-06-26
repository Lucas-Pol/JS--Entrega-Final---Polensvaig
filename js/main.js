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
  updateCartText();
}





/* 

2) agregar los precios de los discos dentro de las cards 
3) ITERADORES: meter los productos con un foreach o iterador para que sean dinamicos
4) 
5) al ejecutar la clear function (tanto por haber comprado como por vaciar el carro), borrar el localstorage
6) AJAX, 
7) 
8) promesas (fetch) para datos estáticos o una API
9) CHEQUEAR LOS "ONCLICK - addprod" de los botones de las cards

opcional:
- si el carrito está vacío al apretar "comprar" que tiré cartel de error (sweetalert)
- tunear un poco la web (cambiar fotos de cd's, poner algun fondito)
- ver de agregar boton de "quitar" al card de los cd's

*/