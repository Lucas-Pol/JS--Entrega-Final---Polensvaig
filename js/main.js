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
    updateCartText();
  }
}

// Update cart text
function updateCartText() {
  const cartText = document.getElementById("carro");
  const itemCount = cart.length;
  cartText.textContent = `En el carrito hay: ${itemCount} discos por un valor de $ ${finalPrice}`;
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

  if (!nombre || !apellido || !direccion || !email) {
    console.log("Por favor completa todos los campos del formulario.");
    return;
  }

  const purchase = {
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    email: email,
    cart: cart,
    total: finalPrice
  };

  const purchaseJSON = JSON.stringify(purchase);
  localStorage.setItem('compra', purchaseJSON);

  console.log(`Estimado ${nombre} ${apellido}, el monto a pagar es de $ ${finalPrice}, se enviará la factura a ${email}.`);

  $('#formularioCompra').modal('hide');
  discount();
}

// Clear cart
function clearCart() {
  finalPrice = 0;
  cart = [];
  updateCartText();
}

// Discount function
function discount() {
  const discountCode = prompt("Ingrese su código de descuento");
  let priceWithDiscount = finalPrice;

  switch (discountCode) {
    case "DESC10":
      priceWithDiscount *= 0.9;
      break;
    case "DESC20":
      priceWithDiscount *= 0.8;
      break;
    case "DESC30":
      priceWithDiscount *= 0.7;
      break;
    default:
      console.log("No ingresaste ningún código o el ingresado no es válido");
      break;
  }

  finalPrice = priceWithDiscount; // Actualizar el valor final con el descuento aplicado
  updateCartText();
  console.log(`El monto a pagar con descuento es de $ ${priceWithDiscount.toFixed(2)}`);
}

// Update cart text on page load
updateCartText();

