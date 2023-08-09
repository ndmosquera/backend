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
        const cart = await cartModel.findOne({
            [con.ID] : id
        });
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
}


