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

//Creates the disc cards (con esta función voy a crear las cards que van a contener la información de los CD's para efectuar la compra correspondiente, esta información viene de un archivo JSON donde tengo creados los objetos y que los capturo con un FETCH y los recorro con un FOREACH para que sean más dinámicos, y a partir del cual si quiero ir agregando más objetos puedo hacerlo sin necesidad de codearlos dentro de mi archivo de javascript. El CATCH lo utilicé para ver si me aparecía algún error y que me lo tire por consola)
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
      button.className = "btn btn-secondary";
      button.setAttribute("onclick", `addProd(${disc.id})`);
      button.textContent = "Agregar";

      const buttonRemove = document.createElement("button");
      buttonRemove.type = "button";
      buttonRemove.className = "btn btn-dark";
      buttonRemove.setAttribute("onclick", `removeProd(${disc.id})`);
      buttonRemove.textContent = "Quitar";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(button);
      cardBody.appendChild(buttonRemove);

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

// Remove from cart
function removeProd(id) {
  const selectedIndex = cart.findIndex((disc) => disc.id === id);
  if (selectedIndex !== -1) {
    const removedDisc = cart.splice(selectedIndex, 1)[0];
    finalPrice -= removedDisc.price;
    updateCartText(finalPrice);
  }
}



// Update cart text
function updateCartText(price) {
  const cartText = document.getElementById("carro");
  const itemCount = cart.length;
  
  if (itemCount === 0) {
    cartText.textContent = "El carrito se encuentra vacío";
  } else {
    cartText.textContent = `En el carrito hay: ${itemCount} discos por un valor de $ ${price}`;
  }
}

// Open purchase modal
function openModal() {
  $('#formularioCompra').modal('show');
}

// Purchase function
function realizarCompra() {
  if (cart.length === 0) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'No se puede realizar la compra cuando el carrito está vacío.',
      confirmButtonText: 'Cerrar'
    });
    return;
  }

  if (!$('#formularioCompra').hasClass('show')) {
    $('#formularioCompra').modal('show');
    return;
  }

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const direccion = document.getElementById('direccion').value;
  const email = document.getElementById('email').value;
  const descuento = document.getElementById('descuento').value;

  if (!nombre || !apellido || !direccion || !email) {
    Swal.fire({
      title: 'Por favor complete todos los campos del formulario de compra.',
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    });
    return;
  }

  let priceWithDiscount = finalPrice;

  if (descuento === "DESC10") {
    priceWithDiscount *= 0.9;
  } else if (descuento === "DESC20") {
    priceWithDiscount *= 0.8;
  } else if (descuento === "DESC30") {
    priceWithDiscount *= 0.7;
  } else if (descuento) {
    Swal.fire({
      title: 'El código de descuento ingresado no es válido.',
      icon: 'question',
      confirmButtonText: 'Cerrar'
    });
    return;
  }

  Swal.fire({
    title: 'Tu compra finalizó con éxito!',
    icon: 'success',
    text: `Estimado ${nombre} ${apellido}, el monto a pagar es de $ ${priceWithDiscount} y se enviará la factura a ${email}.`,
    confirmButtonText: 'Cerrar'
  }).then((result) => {
    if (result.isConfirmed) {
      $('#formularioCompra').modal('hide');
      saveStorage(finalPrice);
      clearCart(true);
    }
  });
}


//Save in local storage
function saveStorage(price){

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const direccion = document.getElementById('direccion').value;
  const email = document.getElementById('email').value;

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
  
  let savedItems = localStorage.getItem('compra');
  console.log(savedItems);
}


// Clear cart
function clearCart(fromCheckout = false) {
  cart = [];
  finalPrice = 0;
  updateCartText(finalPrice);
  localStorage.removeItem('compra');

  if (fromCheckout) {
    $("#formularioCompra").modal("hide");
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('email').value = '';
  }
}












