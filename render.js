// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────

// ── 4. CREAR ELEMENTOS ──────────────────────────────────────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  articulo.dataset.nombre = producto.nombre;

  // La foto y la descripción de la categoría, desde datos.js
  articulo.innerHTML = `
    ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" width="400" height="300">` : ""}
    <h3>${producto.nombre}</h3>
    <p class="categoria">${producto.categoria}${producto.descripcion ? `: ${producto.descripcion}` : ""}</p>
    <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
    <p class="stock">${producto.disponible ? `${producto.stock} en stock` : "Agotado"}</p>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────
function render(lista) {
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos que mostrar.</p>";
  }
}

// ── 6. PINTAR ───────────────────────────────────────────────────────────
render(productos);

// ── 7. RECORRER EL ÁRBOL ────────────────────────────────────────────────
const primeraTarjeta = document.querySelector(".tarjeta");
console.log("Padre de la primera tarjeta:", primeraTarjeta.parentElement.id);
console.log("Su producto es:", primeraTarjeta.dataset.nombre);
