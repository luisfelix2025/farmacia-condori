// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
console.log("jQuery versión:", $.fn.jquery);

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
const vanillaP = document.querySelector("#salida-vanilla");
const jqueryP = $("#salida-jquery");

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", jqueryP.length);

console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
if (vanillaP) {
  vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
}
if (jqueryP.length) {
  jqueryP.text("Cambiado con jQuery: $() + .text()");
}

// ── 5. CLASES ───────────────────────────────────────────────────────────

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
const botonVanilla = document.querySelector("#boton-vanilla");
if (botonVanilla && vanillaP) {
  botonVanilla.addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });
}

$("#boton-jquery").on("click", function () {
  $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
});

// ── 7. CHAINING ─────────────────────────────────────────────────────────
if (jqueryP.length) {
  $("#salida-jquery")
    .addClass("destacado")
    .attr("data-origen", "jquery")
    .css("cursor", "pointer");
}

if (vanillaP) {
  vanillaP.classList.add("destacado");
  vanillaP.setAttribute("data-origen", "vanilla");
  vanillaP.style.cursor = "pointer";
}

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);

// ── 9. IMPLEMENTACIONES DE JQUERY EN LA WEB DE LA FARMACIA ───────────────
$(document).ready(function () {
  // A. Desplazamiento suave (smooth scroll) al hacer clic en el menú
  $("nav a").on("click", function (event) {
    const destino = $(this.getAttribute("href"));
    if (destino.length) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: destino.offset().top - 20 }, 500);
    }
  });

  // B. Efecto de hover interactivo en las tarjetas de medicamentos
  $(document).on("mouseenter", ".tarjeta", function () {
    $(this).css({
      "transform": "translateY(-5px)",
      "transition": "all 0.25s ease",
      "box-shadow": "0 8px 16px rgba(0, 0, 0, 0.15)"
    });
  }).on("mouseleave", ".tarjeta", function () {
    $(this).css({
      "transform": "translateY(0)",
      "box-shadow": "none"
    });
  });

  // C. Animación de aparición suave del aviso de stock
  $("#aviso-stock").hide().fadeIn(800);
});

