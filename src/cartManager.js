import * as con from '../utils/GlobalConstants.mjs';
import fs from 'fs/promises';

export default class CartManager {
    constructor(path) {
      this.path = path;
      this.carts = [];
      this.nextId = 1;
      this.loadFile()
    };

    async loadFile() {
        try{
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            if(this.carts.length > 0){
                const lastCart = this.carts[this.carts.length - 1];
                this.nextId = lastCart[con.CART_ID] + 1;
            }
        } catch(e){
            console.error('Error loading file carts:', e)
        }
    }

    async saveFile() {
        try{
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8')
        } catch(e){
            console.error('Error saving file carts:', e)
        }
    }

    async newCart() {
        const cart = {
            [con.CART_ID]: this.nextId,
            [con.CART_PRODUCTS]: []
        };

        this.carts.push(cart);
        this.nextId++;
        await this.saveFile();
        return 'Cart created successfully';
    }

    getCartById(id){
        const cart = this.carts.find(item => item[con.CART_ID] === id);
        if(cart){
            return cart[con.CART_PRODUCTS];
        } else {
            throw new Error(`Not found a cart with ${con.CART_ID} = ${id}`);

        }
    }

    async addToCart(cid, pid){
        const cart = this.getCartById(cid);
        if(!cart){
            throw new Error("The cart doesn't exist");
        }
        const cartIndex = this.carts.findIndex(cart => cart[con.CART_ID] === cid);
        const productIndex = this.carts[cartIndex][con.CART_PRODUCTS].findIndex(product => product[con.PRODUCT_ID] === pid);
        if(productIndex !== -1){
            this.carts[cartIndex][con.CART_PRODUCTS][productIndex][con.QUANTITY]++;
            } else {
            this.carts[cartIndex][con.CART_PRODUCTS].push({
                [con.PRODUCT_ID] : pid,
                [con.QUANTITY] : 1
            });
        }
        await this.saveFile();
        return 'Product added to cart successfully'
    }
}


