import * as con from './utils/GlobalConstants.mjs';
import fs from 'fs/promises';

class ProductManager {
    constructor(path=con.PATH_PRODUCTS_FILE) {
      this.path = path;
      this.products = [];
      this.nextId = 1;
    };

    async loadFile() {
        try{
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if(this.products.length > 0){
                const lastProduct = this.products[this.products.length - 1];
                this.nextId = lastProduct[con.PRODUCT_ID] + 1;
            }
        } catch(e){
            console.error('Error loading file products:', e)
        }
    }

    async saveFile() {
        try{
            await fs.writeFile(this.path, JSON.stringify(this.products))
        } catch(e){
            console.error('Error saving file products:', e)
        }
    }

    async addProduct(productData) {
        const product = {
            [con.PRODUCT_ID]: this.nextId,
            ...productData
        };

        if(!product[con.PRODUCT_TITLE] || !product[con.PRODUCT_DESCRIPTION] || !product[con.PRODUCT_PRICE] || 
            !product[con.PRODUCT_THUMBNAIL] || !product[con.PRODUCT_CODE] || !product[con.PRODUCT_STOCK]){
            console.error('All fields are required');
            return;
        }

        if(products.some((p) => p[con.PRODUCT_CODE] === product[con.PRODUCT_CODE])){
            console.error(`Product with ${con.PRODUCT_CODE}:${product[con.PRODUCT_CODE]} already exists`);
            return;
        }

        this.products.push(product);
        this.nextId++;
        await this.saveFile();
        console.log('Product added successfully');
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(item => item[con.PRODUCT_ID] === id);
        if(product){
            return product;
        } else {
            console.error(`Not found a product with ${con.PRODUCT_ID} = ${id}`)
        }
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product[con.PRODUCT_ID] === id);
        if(productIndex !== -1){
            const product = this.products[productIndex];
            this.products[productIndex] = {
                [con.PRODUCT_ID]: product[con.PRODUCT_ID],
                ...product,
                ...updatedFields
            };
        await this.saveFile();
        console.log('Product updated successfully');
        }else{
            console.error(`Not found a product with ${con.PRODUCT_ID} = ${id}`);
        }
    }

    async deleteProduct(id){
        const product = this.getProductById(id);
        if(product){
            this.products = this.products.filter(item => item[con.PRODUCT_ID] !== id);
            await this.saveFile();
            console.log('Product deleted successfully');
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
const products = productManager.getProducts();

console.log("------Validacion 1: Array vacio------")
console.log(products)
console.log("------Validacion 2: Añadir producto------")
await productManager.addProduct(product1);
console.log("------Validacion 3: Obtener productos------")
console.log(products)
console.log("------Validacion 4: Añadir producto existente------")
await productManager.addProduct(product1);
console.log("------Validacion 5: Añadir nuevo producto (ID diferente)------")
await productManager.addProduct(product2);
console.log("------Validacion 6: Obtener productos------")
console.log(products)
console.log("------Validacion 7: Obtener producto por ID existente------")
const productID = productManager.getProductById(2);
console.log(productID)
console.log("------Validacion 7: Obtener producto por ID No existente------")
const productIDN = productManager.getProductById(22);
console.log("------Validacion 8: Actualizar Producto------")
const updateProduct2 = {
    title: "Product 2.1",
    price: 59.99,
  };
await productManager.updateProduct(2, updateProduct2);
console.log("------Validacion 9: Eliminar Producto------")
await productManager.deleteProduct(1);
