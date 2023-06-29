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



// Add to cart (esta función se ejecuta cuando el usuario hace click sobre el botón de "agregar" en las cards de los CD's y mediante el método "push" los agrego a mi constante "selectedDisc" y los incorporo de esta manera a mi carrito, reflejándose en el precio a abonar) 
function addProd(id) {
  const selectedDisc = cds.find(disc => disc.id === id);
  if (selectedDisc) {
    cart.push(selectedDisc);
    finalPrice += selectedDisc.price;
    updateCartText(finalPrice);
  }
}

// Remove from cart (esta función se ejecuta de igual manera que la anterior pero sobre el botón de "quitar" en las cards para remover ese elemento de mi carrito y reflejarlo en el precio a abonar)
function removeProd(id) {
  const selectedIndex = cart.findIndex((disc) => disc.id === id);
  if (selectedIndex !== -1) {
    const removedDisc = cart.splice(selectedIndex, 1)[0];
    finalPrice -= removedDisc.price;
    updateCartText(finalPrice);
  }
}



// Update cart text (esta función es para que se visualice en el carrito cuántos elementos tengo y cuál es el precio a abonar por ellos)
function updateCartText(price) {
  const cartText = document.getElementById("carro");
  const itemCount = cart.length;
  
  if (itemCount === 0) {
    cartText.textContent = "El carrito se encuentra vacío";
  } else {
    cartText.textContent = `En el carrito hay: ${itemCount} discos por un valor de $ ${price}`;
  }
}

// Open purchase modal (esta función es para que se abra el modal que contiene mi formulario de compra, una vez que se apreta el botón de compra en el carrito)
function openModal() {
  $('#formularioCompra').modal('show');
}

// Purchase function (esta es mi función principal, por así decirlo, al menos en cuanto a complejidad. Es la función a partir de la cual se logra realizar la compra de los elementos que han sido agregados ("push") al carrito de compras. En un primer lugar, busqué que el usuario no pueda alcanzar al formulario de compra sin que haya agregado algun elemento al carrito (le sale en ese caso un sweetalert de error). En segundo lugar, busqué que una vez verificada esta situación, se abra el modal con el formulario. Una vez abierto el formulario, que mi función tome los valores de los campos completados por el usuario (getElementById), y lo obligue a completar los campos de nombre, apellido, dirección y email (no así el de descuento)., en caso de no completarlos le sale un sweetalert solicitando los complete. Una vez logrado eso, se ejecuta la parte de la función donde aparecen los distintos descuentos, a partir de ello tengo tres opciones: 1) el usuario no ingresa ningún código de descuento, en cuyo caso le sale el cartel de finalización de compra con el precio total a abonar; 2) el usuario ingresa un código de descuento válido (DESC10, DESC20, DESC30) en cuyo caso se aplican los descuentos correspondientes y se reflejan en el precio final a abonar; o 3) el usuario ingresa un código de descuento que no es válido y le sale un sweetalert de error. Finalmente, en caso de que se haya concretado la compra con éxito, se esconde el modal con el formulario, los datos los guardo en el local storage a través de la función saveStorage, los muestro por consola acorde esa última función y el carrito se vacía como para que se pueda seguir comprando) 
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


//Save in local storage (con esta función estoy guardando en el local storage los datos tomados del formulario, así como también de los elementos comprados, y los muestro por consola a través de la variable savedItems)
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


// Clear cart (esta es mi función para limpiar el carrito. La ejecuto tanto cuando el usuario agrega un elemento al carrito pero elige vaciarlo antes de realizar la compra -con el botón de "vaciar carrito"-; como cuando ya se ejecutó completamente la función realizarCompra y la compra fue exitosa, como para que sea más dinámico y el usuario pueda seguir testeando la página. Tuve que agregarle un "if" y un getElementById para poder de esa manera también resetear los valores del modal de formulario de compra y que el usuario pueda seguir ingresando nuevos datos)
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












