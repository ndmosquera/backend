import fs from "fs"

// Lee el archivo JSON
const jsonData = fs.readFileSync('./products.json', 'utf-8');
const productos = JSON.parse(jsonData);

// Itera sobre la lista de productos y agrega el atributo .ID
productos.forEach(producto => {
  producto.owner = "ndmosquera"
});

// Convierte los productos modificados de nuevo a JSON
const newData = JSON.stringify(productos, null, 2);

// Escribe los datos actualizados en el archivo JSON
fs.writeFileSync('./products.json', newData);

console.log('Se han agregado los atributos .ID a los productos con éxito.')