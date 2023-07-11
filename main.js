const mates = [
  { nombre: "Nahuel", precio: 1000 },
  { nombre: "Bariloche", precio: 1500 },
  { nombre: "Pioneros", precio: 1200 },
  { nombre: "San Carlos", precio: 900 },
  { nombre: "Bustillos", precio: 750 },
  { nombre: "El gaucho", precio: 2300 }
];

const carrito = [];
const historialCompras = [];

function darBienvenida() {
  mostrarOpciones();
}

function mostrarMensaje(mensaje) {
  const contenedor = document.getElementById("contenedor");
  const parrafo = document.createElement("p");
  parrafo.textContent = mensaje;
  contenedor.appendChild(parrafo);
}

function mostrarOpciones() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  mostrarMensaje("¿Qué deseas hacer?");

  const opciones = [
    { numero: 1, texto: "Ver opciones de mates" },
    { numero: 2, texto: "Buscar por nombre" },
    { numero: 3, texto: "Filtrar por precio" },
    { numero: 4, texto: "Ver carrito de compras" },
    { numero: 5, texto: "Ver historial de compras" }
  ];

  opciones.forEach(opcion => {
    const btnOpcion = document.createElement("button");
    btnOpcion.textContent = opcion.texto;
    btnOpcion.addEventListener("click", () => {
      manejarOpcion(opcion.numero);
    });
    contenedor.appendChild(btnOpcion);
  });
}

function manejarOpcion(opcion) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  if (opcion === 1) {
    mostrarMates();
  } else if (opcion === 2) {
    mostrarMensaje("Ingresa el nombre del mate:");
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    const btnBuscar = document.createElement("button");
    btnBuscar.textContent = "Buscar";
    btnBuscar.addEventListener("click", () => {
      const nombreBuscado = inputNombre.value.trim();
      if (nombreBuscado) {
        buscarPorNombre(nombreBuscado);
      } else {
        mostrarMensaje("Nombre no válido. Por favor, intenta nuevamente.");
        mostrarOpciones();
      }
    });
    contenedor.appendChild(inputNombre);
    contenedor.appendChild(btnBuscar);
  } else if (opcion === 3) {
    mostrarMensaje("Ingresa el rango de precios (precio mínimo - precio máximo):");
    const inputRangoPrecios = document.createElement("input");
    inputRangoPrecios.type = "text";
    const btnFiltrar = document.createElement("button");
    btnFiltrar.textContent = "Filtrar";
    btnFiltrar.addEventListener("click", () => {
      const rangoPrecios = inputRangoPrecios.value.trim();
      const precios = rangoPrecios.split("-");
      const precioMinimo = parseInt(precios[0]);
      const precioMaximo = parseInt(precios[1]);
      if (!isNaN(precioMinimo) && !isNaN(precioMaximo)) {
        filtrarMatesPorPrecio(precioMinimo, precioMaximo);
      } else {
        mostrarMensaje("Rango de precios no válido. Por favor, intenta nuevamente.");
        mostrarOpciones();
      }
    });
    contenedor.appendChild(inputRangoPrecios);
    contenedor.appendChild(btnFiltrar);
  } else if (opcion === 4) {
    mostrarCarrito();
  } else if (opcion === 5) {
    mostrarHistorialCompras();
  } else {
    mostrarMensaje("Opción inválida. Por favor, intenta nuevamente.");
    mostrarOpciones();
  }
}

function mostrarMates() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  mostrarMensaje("Elige una opción de mate:");

  mates.forEach((mate, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const nombreMate = document.createElement("h3");
    nombreMate.textContent = mate.nombre;
    card.appendChild(nombreMate);

    const precioMate = document.createElement("p");
    precioMate.textContent = "Precio: $" + mate.precio;
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

  // Agregar el mate al historial de compras
  historialCompras.push(mate);
}

function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  if (carrito.length > 0) {
    mostrarMensaje("Carrito de compras:");

    let precioTotal = 0;

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

      precioTotal += item.precio * item.cantidad;
    });

    const precioTotalParrafo = document.createElement("p");
    precioTotalParrafo.textContent = "Precio total: $" + precioTotal;
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
  carrito.length = 0;
}

function mostrarHistorialCompras() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  if (historialCompras.length > 0) {
    mostrarMensaje("Historial de compras:");

    historialCompras.forEach((mate, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = mate.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio: $" + mate.precio;
      card.appendChild(precioMate);

      contenedor.appendChild(card);
    });
  } else {
    mostrarMensaje("Aún no has realizado compras.");
  }
}

darBienvenida();

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
}

function finalizarCompra() {
  carrito.length = 0;
}

function buscarPorNombre(nombreBuscado) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const matesEncontrados = mates.filter(mate =>
    mate.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())
  );

  if (matesEncontrados.length > 0) {
    mostrarMensaje("Mates encontrados:");

    matesEncontrados.forEach(mate => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = mate.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio: $" + mate.precio;
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
    mostrarOpciones();
  }
}

function filtrarMatesPorPrecio(precioMinimo, precioMaximo) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const matesFiltrados = mates.filter(mate =>
    mate.precio >= precioMinimo && mate.precio <= precioMaximo
  );

  if (matesFiltrados.length > 0) {
    mostrarMensaje("Mates filtrados por precio:");

    matesFiltrados.forEach(mate => {
      const card = document.createElement("div");
      card.classList.add("card");

      const nombreMate = document.createElement("h3");
      nombreMate.textContent = mate.nombre;
      card.appendChild(nombreMate);

      const precioMate = document.createElement("p");
      precioMate.textContent = "Precio: $" + mate.precio;
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
    mostrarOpciones();
  }
}

darBienvenida(); 