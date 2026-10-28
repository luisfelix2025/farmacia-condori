

$(document).ready(function () {

  // 1. MENÚ MÓVIL
  $("#menu-toggle").on("click", function () {
    const $boton = $(this);
    const $nav = $("#menu-movil");
    const abierto = $boton.attr("aria-expanded") === "true";

    if (abierto) {
      $nav.stop(true, true).slideUp(200, function () {
        this.hidden = true;
      });

      $boton.attr("aria-expanded", "false");
    } else {
      $nav.prop("hidden", false).hide().slideDown(200);
      $boton.attr("aria-expanded", "true");
    }
  });

  // 2. ACORDEÓN
  $("#acordeon").on("click", ".titulo", function () {
    const $titulo = $(this);
    const $cuerpo = $titulo.next(".cuerpo");
    const abierto = $titulo.attr("aria-expanded") === "true";

    // Cerrar las demás respuestas
    $("#acordeon .cuerpo").not($cuerpo)
      .stop(true, true)
      .slideUp(200)
      .prop("hidden", true);

    $("#acordeon .titulo").not($titulo)
      .attr("aria-expanded", "false");

    // Alternar la respuesta seleccionada
    if (abierto) {
      $titulo.attr("aria-expanded", "false");

      $cuerpo.stop(true, true).slideUp(200, function () {
        this.hidden = true;
      });
    } else {
      $titulo.attr("aria-expanded", "true");
      $cuerpo.prop("hidden", false).hide().slideDown(200);
    }
  });

  // 3. MOSTRAR Y OCULTAR AVISOS CON EFECTO ESCALONADO
  $("#mostrar-avisos").on("click", function () {
    const $boton = $(this);
    const $avisos = $("#avisos li");
    const visibles = $avisos.filter(function () {
      return !this.hidden && $(this).is(":visible");
    }).length;

    if (visibles > 0) {
      $avisos.stop(true, true).each(function (indice) {
        $(this).delay(indice * 80).fadeOut(200, function () {
          this.hidden = true;
        });
      });

      $boton.text("Mostrar avisos");
    } else {
      $avisos.each(function () {
        this.hidden = false;
      });

      $avisos.hide().each(function (indice) {
        $(this).delay(indice * 120).fadeIn(250);
      });

      $boton.text("Ocultar avisos");
    }
  });

  // 4. FUNCIÓN PROPIA PARA RESALTAR ELEMENTOS
  function resaltar($seleccion, milisegundos = 1200) {
    $seleccion.addClass("resaltado");

    setTimeout(function () {
      $seleccion.removeClass("resaltado");
    }, milisegundos);

    return $seleccion;
  }

  resaltar($("#panel h2")).css("letter-spacing", "0.5px");
  // 5. MENÚ PRINCIPAL DESPLEGABLE
  $("#btn-menu").on("click", function () {
    const $boton = $(this);
    const $opciones = $("#opciones-menu");
    const abierto = $boton.attr("aria-expanded") === "true";

    $opciones.prop("hidden", abierto);
    $boton.attr("aria-expanded", String(!abierto));
  });

  $("#opciones-menu a").on("click", function () {
    $("#opciones-menu").prop("hidden", true);
    $("#btn-menu").attr("aria-expanded", "false");
  });

});