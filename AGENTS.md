# AGENTS.md - Proyecto Farmacia Condori

Este archivo contiene la memoria del proyecto, su arquitectura, convenciones de código y reglas para los agentes de IA (Antigravity).

---

## 1. Información General del Proyecto

- **Nombre del Proyecto:** Farmacia Condori
- **Estudiante / Desarrollador:** Luis Félix Condori Churqui
- **Repositorio:** `luisfelix2025/farmacia-condori`
- **Ubicación:** Av. Principal Viacha, Colquencha, La Paz (Bolivia)
- **Contacto:** 64072425
- **Moneda oficial:** Bolivianos (Bs)
- **Objetivo:** Portal web informativo e interactivo para consultar medicamentos, verificar stock/disponibilidad en tiempo real, filtrar por categorías, buscar fármacos y gestionar pedidos mediante formularios con validación.

---

## 2. Pila Tecnológica y Estándares

- **HTML5:** Marcado semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<fieldset>`).
- **CSS3:** Vanilla CSS organizado por secciones con variables CSS (`:root`), Flexbox y CSS Grid para la galería de categorías.
- **JavaScript:** ES6+ puro (modularizado por responsabilidades) + jQuery 3.7.1 local para micro-interacciones, efectos y animaciones.

---

## 3. Estructura de Archivos y Responsabilidades

```text
proyecto_1_luis/
├── index.html                     # Estructura semántica completa, secciones #comparacion, #panel y enlace de scripts
├── estilos.css                    # Sistema de diseño, variables, acordeón, menú móvil y avisos
├── datos.js                       # Modelo de datos: array 'productos' y cálculos
├── funciones.js                   # Lógica matemática, utilidades de precio y closures
├── render.js                      # Generación dinámica de tarjetas en el DOM
├── eventos.js                     # Búsqueda, filtros por categoría y validación de formulario
├── app.js                         # Estado general, variables de demostración y avisos de stock
├── jquery-3.7.1.min.js            # Biblioteca jQuery 3.7.1 minificada local
├── jquery-comparado.js            # Comparación interactiva DOM: Vanilla JS vs jQuery (#comparacion)
├── jquery-panel.js                # Efectos del Día 11: slideToggle menú, acordeón de preguntas y avisos escalonados
├── ERRORES Y ARREGLOS - leer primero.txt  # Registro histórico de depuración
├── README.md                      # Documentación del proyecto y laboratorios
└── *.svg / *.jpg / *.png          # Recursos gráficos (iconos de medicamentos y fotos)
```

### Detalle de Módulos JavaScript:

1. **`datos.js`**:
   - Fuente de la verdad de los datos del negocio.
   - Define el arreglo `productos` con objetos:
     `{ nombre, precio, categoria, stock, disponible, imagen, descripcion }`.
   - Categorías actuales: `"Analgésicos"`, `"Antibióticos"`, `"Jarabes"`, `"Vitaminas"`.
   - Contiene métodos de array funcionales (`map`, `filter`, `find`, `reduce`, `some`, `every`).

2. **`funciones.js`**:
   - Funciones declaradas, expresiones y funciones flecha (`=>`).
   - Cálculos con impuestos (`tasa = 13%`) y descuentos.
   - Closures para seguimiento de ventas (`jarabesVendidos`, `vitaminasVendidas`).

3. **`render.js`**:
   - Inyecta elementos en `<div id="lista-productos"></div>`.
   - Función constructora de tarjetas: `crearTarjeta(producto)` retorna un `<article class="tarjeta">`.
   - Agrega la clase `.agotado` si el producto no está disponible.
   - Función principal `render(lista)`: limpia el contenedor y dibuja las tarjetas.

4. **`eventos.js`**:
   - Escucha el evento `input` en `#buscador` para búsqueda en tiempo real por nombre.
   - Delegación de eventos `click` en `#filtros` para conmutar categorías activas (`data-categoria`).
   - Manejo del `submit` en el formulario de pedidos evitando recarga (`preventDefault`).
   - Validación personalizada de fechas (la fecha de entrega no puede ser anterior a la actual).

5. **`app.js`**:
   - Configuración base, constantes de negocio y demostración de tipos de datos.
   - Actualización dinámica del mensaje de stock en `#aviso-stock`.

6. **`jquery-comparado.js`**:
   - Demuestra la comparación entre Vanilla JS (`document.querySelector`, `classList`) y jQuery (`$()`, `.toggleClass()`, encadenamiento `.addClass().attr().css()`).
   - Requiere la sección `#comparacion`, con `#boton-vanilla`, `#boton-jquery`, `#salida-vanilla` y `#salida-jquery`.

7. **`jquery-panel.js` (Panel del Día 11)**:
   - Implementa menú interactivo con `#menu-toggle` y `#menu-movil` mediante `.slideToggle()`.
   - Implementa acordeón con `#acordeon`, `.titulo` y `.cuerpo` mediante delegación y `.slideToggle()`.
   - Implementa avisos escalonados con `#mostrar-avisos` y `#avisos li` mediante `.delay().fadeIn()` y `.fadeOut()`.
   - Función propia `resaltar($seleccion, milisegundos)` para resaltar temporalmente elementos (`$("#panel h2")`).

---

## 4. Orden Crítico de Scripts en `index.html`

El orden de carga al final del `<body>` es obligatorio para evitar referencias `undefined` o elementos no inicializados:

```html
<script src="jquery-3.7.1.min.js"></script>
<script src="datos.js"></script>
<script src="funciones.js"></script>
<script src="render.js"></script>
<script src="eventos.js"></script>
<script src="app.js"></script>
<script src="jquery-comparado.js"></script>
<script src="jquery-panel.js"></script>
```

---

## 5. Reglas y Convenciones Clave para Agentes de IA

1. **No escribir `<article>` manuales en HTML:**
   - Todo producto debe generarse dinámicamente desde `datos.js` a través de `render.js` dentro del contenedor `<div id="lista-productos"></div>`.
2. **Consistencia de IDs:**
   - Identificadores para navegación y lógica en minúsculas: `#productos`, `#horarios`, `#contacto`, `#galeria`, `#pedido`, `#aviso-stock`, `#buscador`, `#filtros`, `#comparacion`, `#panel`, `#menu-toggle`, `#menu-movil`, `#acordeon`, `#mostrar-avisos`, `#avisos`.
3. **Ortografía y Nomenclatura médica:**
   - Respetar los nombres oficiales con sus tildes: *"Paracetamol"*, *"Diclofenaco"*, *"Metamizol"*, *"Amoxicilina"*, *"Azitromicina"*, *"Ambroxol"*, *"Cloperastina"*, *"Acetilcisteína"*, *"Vitaminas liposolubles / hidrosolubles"*.
   - La palabra es **"Jarabes"** (con "b"), nunca con "v".
4. **Nombres de Archivos Multimedia:**
   - La imagen de antibióticos se llama exactamente `antibioticoss.jpg`.
   - La imagen de jarabe se llama `jarave.jpg`.
   - Verificar siempre la existencia del archivo en el directorio antes de enlazarlo.
5. **Formulario de Pedidos:**
   - Las opciones del `<select id="producto">` deben corresponder a los productos o categorías de la farmacia.
   - Teléfonos válidos en Bolivia: 7 u 8 dígitos numéricos sin espacios.
6. **Accesibilidad (A11y):**
   - Usar la clase `.visualmente-oculto` para etiquetas requeridas por lectores de pantalla que no deban verse visualmente.
   - Mantener atributos `aria-live="polite"` en el contenedor de conteo de resultados (`#resultado`).
   - Usar `aria-expanded` y `aria-controls` en botones desplegables del panel.
7. **Diseño Visual:**
   - Paleta oficial: Fondo celeste (`#87CEEB`), superficie turquesa (`#40E0D0`), primario azul marino (`#1a4a7a`), acento teja/naranja (`#b8471f`).
