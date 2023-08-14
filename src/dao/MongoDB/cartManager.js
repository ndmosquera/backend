import mongoose from 'mongoose';
import * as con from '../../../utils/GlobalConstants.mjs';
import cartModel from '../models/cart.schema.js';
import productModel from '../models/product.schema.js';

export default class CartManager {
    constructor() {};

    async newCart() {
        const cart = await cartModel.insertMany([{}]);
        return cart
    }

    async getCartById(id){
        const cart = await cartModel.findById(id).populate(`${con.PRODUCTS}.${con.ID}`);
        if(cart){
            return cart;
        }else{
            throw new Error(`Not found a cart with ${con.ID} = ${id}`)
        }
    }

    async addToCart(cid, pid){
        const cart = await cartModel.findById(cid)
        if(!cart){
            throw new Error(`Cart with ${con.ID} : ${cid} do not exist`)
        }
        const product = await productModel.findById(pid)
        if(!product){
            throw new Error(`Product with ${con.ID} : ${pid} do not exist`)
        }

        const updateCart = await cartModel.findOneAndUpdate(
            {[con.ID] : cid, [`${con.PRODUCTS}.${con.ID}`] : pid},
            {$inc : { [`${con.PRODUCTS}.$.${con.QUANTITY}`] : 1 }},
            {new : true}
        );

        if(!updateCart){
            const newCart = await cartModel.findOneAndUpdate(
                {[con.ID] : cid},
                {$push : {[con.PRODUCTS]: {
                    [con.ID]: pid,
                    [con.QUANTITY] : 1
                }}},
                {new : true}
            );
            return newCart
        }
        return updateCart
    }

    async deleteProductFromCart(cid, pid) {
        const updateCart = await cartModel.findByIdAndUpdate(
            cid,
            {
                $pull: {[con.PRODUCTS]: {[con.ID]: pid}}
            },
            { new: true}
        );

        if(!updateCart){
            throw new Error(`Not found a cart with ${con.ID} = ${id}`)
        }

        return updateCart
    }

    async addQuantityProduct(cid, pid, qty) {
        const cart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { [`products.$[elem].${con.QUANTITY}`]: qty } },
            { arrayFilters: [{ [`elem.${con.ID}`]: pid }], new: true }
        );
        if (!cart) {
            throw new Error(`Not found a cart with ${con.ID} = ${id}`);
        }
        const productIndex = cart.products.findIndex(product => product[con.ID].toString() === pid);
        if (productIndex === -1) {
            throw new Error(`Product with ${con.ID} = ${pid} not found in the cart`);
        }
        return cart;
    }

    async removeAllProducts(cid) {

        const cart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { [con.PRODUCTS]: [] } },
            { new: true }
        );
        if (!cart) {
            throw new Error(`Not found a cart with ${con.ID} = ${cid}`);
        }
        return cart;
    }
}


