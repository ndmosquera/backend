import * as con from '../utils/GlobalConstants.mjs';
import fs from 'fs/promises';

export default class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.nextId = 1;
      this.loadFile()
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
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
        } catch(e){
            console.error('Error saving file products:', e)
        }
    }

    async addProduct(productData) {
        
        if(con.PRODUCT_ID in productData){
            delete productData[con.PRODUCT_ID];
        }

        const product = {
            [con.PRODUCT_ID]: this.nextId,
            ...productData
        };

        if(!(con.PRODUCT_STATUS in productData)){
            product[con.PRODUCT_STATUS] = true
        }

        if(!product[con.PRODUCT_TITLE] || !product[con.PRODUCT_DESCRIPTION] || !product[con.PRODUCT_CODE] ||
            !product[con.PRODUCT_PRICE] || !product[con.PRODUCT_STOCK] || !product[con.PRODUCT_CATEGORY]){
            throw new Error('All fields are required');
        }

        if(this.products.some((p) => p[con.PRODUCT_CODE] === product[con.PRODUCT_CODE])){
            throw new Error(`Product with ${con.PRODUCT_CODE}:${product[con.PRODUCT_CODE]} already exists`);
        }

        this.products.push(product);
        this.nextId++;
        await this.saveFile();
        return product;
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(item => item[con.PRODUCT_ID] === id);
        if(product){
            return product;
        } else {
            throw new Error(`Not found a product with ${con.PRODUCT_ID} = ${id}`)
        }
    }

    async updateProduct(id, updatedFields) {
        if(con.PRODUCT_ID in updatedFields){
            throw new Error("You can not update an ID product")
        }
        
        if(con.PRODUCT_CODE in updatedFields){
            
            if(this.products.some((p) => p[con.PRODUCT_CODE] === updatedFields[con.PRODUCT_CODE])){
                throw new Error(`Product with ${con.PRODUCT_CODE}:${updatedFields[con.PRODUCT_CODE]} already exists`);
            }
        }
        
        const productIndex = this.products.findIndex(product => product[con.PRODUCT_ID] === id);
        if(productIndex !== -1){
            const product = this.products[productIndex];
            this.products[productIndex] = {
                [con.PRODUCT_ID]: product[con.PRODUCT_ID],
                ...product,
                ...updatedFields
            };
        await this.saveFile();
        return 'Product updated successfully';
        }else{
            throw new Error(`Not found a product with ${con.PRODUCT_ID} = ${id}`);
        }
    }

    async deleteProduct(id){
        const product = this.getProductById(id);
        if(product){
            this.products = this.products.filter(item => item[con.PRODUCT_ID] !== id);
            await this.saveFile();
            return 'Product deleted successfully';
        }
    }

    getProductByCode(code){
        const product = this.products.find(item => item[con.PRODUCT_CODE] === code);
        if(product){
            return product;
        } else {
            throw new Error(`Not found a product with ${con.PRODUCT_CODE} = ${code}`)
        }
    }
}