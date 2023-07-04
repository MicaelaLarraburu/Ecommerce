const mates = [
  { nombre: "Nahuel", precio: 1000 },
  { nombre: "Bariloche", precio: 1500 },
  { nombre: "Pioneros", precio: 1200 },
  { nombre: "San Carlos", precio: 900 },
  { nombre: "Bustillos", precio: 750 },
  { nombre: "El gaucho", precio: 2300 }
];

const carrito = []; // Array para almacenar los productos seleccionados

function darBienvenida() {
  const usuario = prompt("¡Bienvenido al ecommerce de mates! ¿Eres comprador o revendedor?");
  if (usuario.toLowerCase() === "comprador") {
    mostrarOpciones();
  } else if (usuario.toLowerCase() === "revendedor") {
    mostrarOpciones(true);
  } else {
    mostrarMensaje("Opción inválida. Por favor, intenta nuevamente.");
    darBienvenida();
  }
}

function mostrarMensaje(mensaje) {
  const contenedor = document.getElementById("contenedor");
  const parrafo = document.createElement("p");
  parrafo.textContent = mensaje;
  contenedor.appendChild(parrafo);
}

function mostrarOpciones(esRevendedor) {
  const opcion = prompt("¿Qué deseas hacer?\n1) Ver opciones de mates\n2) Buscar por nombre\n3) Filtrar por precio\n4) Ver carrito de compras");

  if (opcion === "1") {
    mostrarMates(esRevendedor);
  } else if (opcion === "2") {
    buscarPorNombre(esRevendedor);
  } else if (opcion === "3") {
    filtrarPorPrecio(esRevendedor);
  } else if (opcion === "4") {
    mostrarCarrito();
  } else {
    mostrarMensaje("Opción inválida. Por favor, intenta nuevamente.");
    mostrarOpciones(esRevendedor);
  }
}

function mostrarMates(esRevendedor) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ""; // Limpiamos el contenido del contenedor

  mostrarMensaje("Elige una opción de mate:");

  mates.forEach((mate, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const nombreMate = document.createElement("h3");
    nombreMate.textContent = mate.nombre;
    card.appendChild(nombreMate);

    const precioMate = document.createElement("p");
    precioMate.textContent = "Precio: $" + (esRevendedor ? mate.precio * 0.9 : mate.precio);
    card.appendChild(precioMate);

    const btnComprar = document.createElement("button");
    btnComprar.textContent = "Comprar";
    btnComprar.addEventListener("click", () => {
      agregarAlCarrito(mate);
      mostrarMensaje("Se ha agregado " + mate.nombre + " al carrito.");
      mostrarCarrito();
    });
    card.appendChild(btnComprar);

    contenedor.appendChild(card);
  });
}

function agregarAlCarrito(mate) {
  const mateEnCarrito = carrito.find(item => item.nombre === mate.nombre);

  if (mateEnCarrito) {
    mateEnCarrito.cantidad++;
  } else {
    carrito.push({
      nombre: mate.nombre,
      precio: mate.precio,
      cantidad: 1
    });
  }
}

function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ""; // Limpiamos el contenido del contenedor

  if (carrito.length > 0) {
    mostrarMensaje("Carrito de compras:");

    let precioTotal = 0; // Variable para almacenar el precio total

    carrito.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = item.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio unitario: $" + item.precio + " - Cantidad: " + item.cantidad;
      card.appendChild(precioMate);

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        eliminarDelCarrito(index);
        mostrarCarrito();
      });
      card.appendChild(btnEliminar);

      contenedor.appendChild(card);

      precioTotal += item.precio * item.cantidad; // Calculamos el precio total sumando los precios individuales de cada producto
    });

    const precioTotalParrafo = document.createElement("p");
    precioTotalParrafo.textContent = "Precio total: $" + precioTotal; // Mostramos el precio total en el carrito
    contenedor.appendChild(precioTotalParrafo);

    const btnContinuarComprando = document.createElement("button");
    btnContinuarComprando.textContent = "Continuar comprando";
    btnContinuarComprando.addEventListener("click", () => {
      mostrarOpciones();
    });
    contenedor.appendChild(btnContinuarComprando);

    const btnFinalizarCompra = document.createElement("button");
    btnFinalizarCompra.textContent = "Finalizar compra";
    btnFinalizarCompra.addEventListener("click", () => {
      finalizarCompra();
      mostrarMensaje("¡Gracias por tu compra!");
    });
    contenedor.appendChild(btnFinalizarCompra);
  } else {
    mostrarMensaje("Tu carrito está vacío.");
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
}

function finalizarCompra() {
  carrito.length = 0; // Vaciar el carrito
}

function buscarPorNombre(esRevendedor) {
  const nombreBuscado = prompt("Ingresa el nombre del mate que deseas buscar:");
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ""; // Limpiamos el contenido del contenedor

  const matesEncontrados = mates.filter(mate => mate.nombre.toLowerCase() === nombreBuscado.toLowerCase());

  if (matesEncontrados.length > 0) {
    mostrarMensaje("Mates encontrados:");

    matesEncontrados.forEach(mate => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = mate.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio: $" + (esRevendedor ? mate.precio * 0.9 : mate.precio);
      card.appendChild(precioMate);

      const btnComprar = document.createElement("button");
      btnComprar.textContent = "Comprar";
      btnComprar.addEventListener("click", () => {
        agregarAlCarrito(mate);
        mostrarMensaje("Se ha agregado " + mate.nombre + " al carrito.");
        mostrarCarrito();
      });
      card.appendChild(btnComprar);

      contenedor.appendChild(card);
    });
  } else {
    mostrarMensaje("No se encontró ningún mate con ese nombre.");
  }
}

function filtrarPorPrecio(esRevendedor) {
  const precioMaximo = parseInt(prompt("Ingresa el precio máximo deseado:"));
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ""; // Limpiamos el contenido del contenedor

  const matesFiltrados = mates.filter(mate => {
    const precio = esRevendedor ? mate.precio * 0.9 : mate.precio;
    return precio <= precioMaximo;
  });

  if (matesFiltrados.length > 0) {
    mostrarMensaje("Mates filtrados por precio:");

    matesFiltrados.forEach(mate => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = mate.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio: $" + (esRevendedor ? mate.precio * 0.9 : mate.precio);
      card.appendChild(precioMate);

      const btnComprar = document.createElement("button");
      btnComprar.textContent = "Comprar";
      btnComprar.addEventListener("click", () => {
        agregarAlCarrito(mate);
        mostrarMensaje("Se ha agregado " + mate.nombre + " al carrito.");
        mostrarCarrito();
      });
      card.appendChild(btnComprar);

      contenedor.appendChild(card);
    });
  } else {
    mostrarMensaje("No se encontraron mates dentro de ese rango de precio.");
  }
}

darBienvenida();
















