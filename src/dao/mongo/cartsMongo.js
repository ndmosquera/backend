import cartModel from "../models/productSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'
import CustomError from "../../utils/customError.js";

export default class CartsMongo {
    constructor(){}

    create = async(next) => {
        try {
            let one = await cartModel.create({[con.PRODUCTS]: []})
            return {
                [con.MSG] : "Cart created successfully",
                [con.DATA] : one.toObject(),
                [con.STATUS] : con.OK
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
    }

    read = async (next, id = null) => {
        try {
            if(id){
                const cart = await cartModel.findById(id);
                if (cart) {
                    return {
                        [con.MSG]: 'Cart found successfully',
                        [con.DATA]: cart.toObject(),
                        [con.STATUS]: con.OK,
                    };
                } else {
                    CustomError(con.ErrorDict.notFoundOne)
                }
            } else {
            let all = await cartModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Carts read successfully",
                        [con.DATA] : all.map(item => item.toObject()),
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

    update = async (next, id, data) => {
        try {
            let one = await cartModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Cart updated successfully",
                    [con.DATA] : one.toObject(),
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

    destroy = async (next, id) => {
        try {
            let one = await cartModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Cart deleted successfully",
                    [con.DATA] : one.toObject(),
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