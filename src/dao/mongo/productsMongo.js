import productModel from "../models/productSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'
import CustomError from "../../utils/customError.js";

export default class ProductsMongo {
    constructor(){}

    create = async (next,data) => {
        try {
            let one = await productModel.create(data)
            return {
                [con.MSG] : "Product created successfully",
                [con.DATA] : one[con.ID],
                [con.STATUS] : con.OK
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
    }


    read = async (next,parameter = null) => {
        try {
            if(parameter){
                const product = await productModel.find(parameter);
                if (product) {
                    return {
                        [con.MSG]: 'Products found successfully',
                        [con.DATA]: product,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    CustomError(con.ErrorDict.notFoundOne)
                }
            } else {
            let all = await productModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Products read successfully",
                        [con.DATA] : all,
                        [con.STATUS] : con.OK
                    }
                } else {
                    CustomError(con.ErrorDict.notFound)
                }
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
    }

    update = async (next,id, data) => {
        try {
            let one = await productModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Product updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                CustomError(con.ErrorDict.notFoundOne)
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
    }

    destroy = async (next,id) => {
        try {
            let one = await productModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Product deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                CustomError(con.ErrorDict.notFoundOne)
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
        
    }
}