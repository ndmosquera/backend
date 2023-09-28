import productModel from "../models/productSchema.js";
import * as con from "../../utils/GlobalConstants.mjs"

export default class ProductDAO {
    constructor() {}

    async find(filter, limit, page, sort) {
        const products = await productModel.paginate( 
            filter,  
            {limit, page,
            sort: sort === "desc" ? "-price" : sort === "asc" ? "price" : undefined}
        );
        return products
    }

    async findByCode(code){
        return await productModel.findOne({ [con.CODE]: code });
    };

    async findById(id){
        return await productModel.findById(id);
    };

    async create(product){
        return await productModel.create(product);
    };

    async findByIdAndUpdate(id, action, args){
        return await productModel.findByIdAndUpdate(id, action, args);
    };

    async deleteById(id){
        return await productModel.findByIdAndRemove(id);
    };
}