// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const paracetamolDelDia = {
  nombre: "Paracetamol",
  precio: 10,
  categoria: "Analgésicos",
  stock: 40,
  disponible: true,
};

console.log(paracetamolDelDia.nombre);

const propiedad = "precio";
console.log(paracetamolDelDia[propiedad]);

paracetamolDelDia.stock = 35;
paracetamolDelDia.integral = false;
delete paracetamolDelDia.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = paracetamolDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

const paracetamolGenerico = { ...paracetamolDelDia, precio: 6, nombre: "Paracetamol genérico" };
console.log(paracetamolGenerico);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "Paracetamol", precio: 10.00, categoria: "Analgésicos", stock: 40, disponible: true,
    imagen: "paracetamol.svg", descripcion: "Para aliviar el dolor muscular y de cabeza." },
  { nombre: "Diclofenaco", precio: 8.00, categoria: "Analgésicos", stock: 25, disponible: true,
    imagen: "diclofenaco.svg", descripcion: "Para aliviar el dolor muscular y de cabeza." },
  { nombre: "Metamizol", precio: 12.00, categoria: "Analgésicos", stock: 8, disponible: true,
    imagen: "metamizol.svg", descripcion: "Para aliviar el dolor muscular y de cabeza." },
  { nombre: "Amoxicilina", precio: 14.00, categoria: "Antibióticos", stock: 20, disponible: true,
    imagen: "amoxicilina.svg", descripcion: "Medicamento utilizado para tratar infecciones bacterianas." },
  { nombre: "Azitromicina", precio: 25.00, categoria: "Antibióticos", stock: 12, disponible: true,
    imagen: "azitromicina.svg", descripcion: "Antibiótico eficaz para infecciones respiratorias." },
  { nombre: "Ambroxol", precio: 27.50, categoria: "Jarabes", stock: 0, disponible: false,
    imagen: "ambroxol.svg", descripcion: "Para aliviar la tos y otros síntomas respiratorios." },
  { nombre: "Cloperastina", precio: 22.00, categoria: "Jarabes", stock: 30, disponible: true,
    imagen: "cloperastina.svg", descripcion: "Para aliviar la tos y otros síntomas respiratorios." },
  { nombre: "Acetilcisteína", precio: 45.00, categoria: "Jarabes", stock: 2, disponible: true,
    imagen: "acetilcisteina.svg", descripcion: "Para aliviar la tos y otros síntomas respiratorios." },
  { nombre: "Vitaminas liposolubles", precio: 18.00, categoria: "Vitaminas", stock: 50, disponible: true,
    imagen: "vitaminas_liposolubles.svg", descripcion: "Para complementar una alimentación saludable." },
  { nombre: "Vitaminas hidrosolubles", precio: 15.00, categoria: "Vitaminas", stock: 0, disponible: false,
    imagen: "vitaminas_hidrosolubles.svg", descripcion: "Para complementar una alimentación saludable." },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 40);
console.log(caro);

console.log(nombres.includes("Metamizol"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalAntibioticosEnStock = productos
  .filter(p => p.categoria === "Antibióticos" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Antibióticos en stock: Bs", totalAntibioticosEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const diclofenaco = new Producto("Diclofenaco", 10, 30);
console.log(diclofenaco.nombre, diclofenaco.estaDisponible(), diclofenaco.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const bragil= new ProductoConDescuento("Bragil", 5, 20, 20);
console.log(bragil.precioFinal(), bragil.estaDisponible());
