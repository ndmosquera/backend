import productModel from "../models/productSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'

export default class ProductsMongo {
    constructor(){}

    create = async (data) => {
        try {
            let one = await productModel.create(data)
            return {
                [con.MSG] : "Product created successfully",
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


    read = async (parameter = null) => {
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
                    return {
                        [con.MSG]: `There is no product with ${parameter}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
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
                    return {
                        [con.MSG]: "There are no products to show",
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
            let one = await productModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Product updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no product with ID = ${id}`,
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
            let one = await productModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Product deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no product with ID = ${id}`,
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