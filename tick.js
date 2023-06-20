// import * as con from './utils/GlobalConstants.mjs'

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    // TODO: Reemplazar campos con el archivo de constantes cuando iniciemos el proyecto
    addProduct(product) {
        if(!product['title'] || !product['description'] || !product['price'] || 
            !product['thumbnail'] || !product['code'] || !product['stock']){
            console.log('Todos los campos son requeridos');
            return;
        }
        if(this.products.some((p) => p['code'] === product['code'])){
            console.log(`Product with ${'code'}:${product['code']} already exists`);
            return;
        }
        const newProduct = {
            id: this.nextId++,
            ...product,
        };
        this.products.push(newProduct);
        console.log('Product added successfully')
    }

    getProduct() {
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.error('Not found');
        }
    }
}


const product1 = {
    title: "Product 1",
    description: "Description 1",
    price: 10.99,
    thumbnail: "path/to/image1.jpg",
    code: "P1",
    stock: 100,
  };

  const product2 = {
    title: "Product 2",
    description: "Description 2",
    price: 19.99,
    thumbnail: "path/to/image2.jpg",
    code: "P2",
    stock: 50,
  };

const productManager = new ProductManager();
const products = productManager.getProduct();

console.log("------Validacion 1: Array vacio------")
console.log(products)

console.log("------Validacion 2: Añadir producto------")
productManager.addProduct(product1);
console.log("------Validacion 3: Obtener productos------")
console.log(products)
console.log("------Validacion 4: Añadir producto existente------")
productManager.addProduct(product1);
console.log("------Validacion 5: Añadir nuevo producto (ID diferente)------")
productManager.addProduct(product2);
console.log("------Validacion 6: Obtener productos------")
console.log(products)
console.log("------Validacion 7: Obtener producto por ID existente------")
const productID = productManager.getProductById(2);
console.log(productID)
console.log("------Validacion 7: Obtener producto por ID No existente------")
const productIDN = productManager.getProductById(22);


