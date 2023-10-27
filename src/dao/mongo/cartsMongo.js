import cartModel from "../models/productSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'

export default class CartsMongo {
    constructor(){}

    create = async() => {
        try {
            let one = await cartModel.create({[con.PRODUCTS]: []})
            return {
                [con.MSG] : "Cart created successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    read = async (id = null) => {
        try {
            if(id){
                const cart = await cartModel.findById(id);
                if (cart) {
                    return {
                        [con.MSG]: 'Cart found successfully',
                        [con.DATA]: cart,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no cart with ID = ${id}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
            let all = await cartModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Carts read successfully",
                        [con.DATA] : all,
                        [con.STATUS] : con.OK
                    }
                } else {
                    return {
                        [con.MSG]: "There are no carts to show",
                        [con.DATA] : null,
                        [con.STATUS] : con.ERROR
                    };
                }
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR
            }
        }
    }

    update = async (id, data) => {
        try {
            let one = await cartModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Cart updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no cart with ID = ${id}`,
                    [con.DATA] : null,
                    [con.STATUS] : con.ERROR
                };
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR 
            }
        }
    }

    destroy = async (id) => {
        try {
            let one = await cartModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Cart deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no cart with ID = ${id}`,
                    [con.DATA] : null,
                    [con.STATUS] : con.ERROR
                };
            }
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS] : con.ERROR 
            }
        }
        
    }
}