import * as con from '../../../utils/GlobalConstants.mjs';
import productModel from '../models/product.schema.js';

export default class ProductManager {
    constructor() {};

    async addProduct(productData) {
        const product = {
            ...productData
        };

        if(!(con.PRODUCT_STATUS in productData)){
            product[con.PRODUCT_STATUS] = true
        }

        if((con.ID in productData)){
            throw new Error('You can not assign an ID to a product');
        }


        if(!product[con.PRODUCT_TITLE] || !product[con.PRODUCT_DESCRIPTION] || !product[con.PRODUCT_CODE] ||
            !product[con.PRODUCT_PRICE] || !product[con.PRODUCT_STOCK] || !product[con.PRODUCT_CATEGORY]){
            throw new Error('All fields are required');
        }

        const sameCode = await productModel.findOne({
            [con.PRODUCT_CODE] : product[con.PRODUCT_CODE]
        })
        if(sameCode){
            throw new Error(`Product with ${con.PRODUCT_CODE}:${product[con.PRODUCT_CODE]} already exists`);
        }

        const newProduct = await productModel.insertMany([product]);

        return newProduct;
    }

    async getProducts(){
        const products = await productModel.find()
        return products
    }

    async getProductById(id){
        const product = await productModel.findOne({
            [con.ID] : id
        });
        if(product){
            return product;
        }else{
            throw new Error(`Not found a product with ${con.ID} = ${id}`)
        }
    }

    async updateProduct(id, updatedFields) {
        if(con.ID in updatedFields){
            throw new Error("You can not update an ID product")
        }

        if(con.PRODUCT_CODE in updatedFields){
            const sameCode = await productModel.findOne({
                [con.PRODUCT_CODE] : updatedFields[con.PRODUCT_CODE]
            })
            if(sameCode){
                throw new Error(`Product with ${con.PRODUCT_CODE}:${sameCode[con.PRODUCT_CODE]} already exists`);
            }
        }

        const product = await productModel.findOneAndUpdate(
            {
                [con.ID] : id
            },
            updatedFields,
            { new: true }
        );
        
        if(product){
            return product
        } else{
            throw new Error(`Not found a product with ${con.ID} = ${id}`);
        }
    }

    async deleteProduct(id){
        const product = await productModel.findOneAndDelete({
            [con.ID] : id
        })
        if(product){
            return product
        } else{
            throw new Error(`Not found a product with ${con.ID} = ${id}`);
        }
    }
}