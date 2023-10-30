import tokenModel from "../models/tokenSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'

export default class TokensMongo {
    constructor(){}

    create = async (data) => {
        try {
            let one = await tokenModel.create(data)
            return {
                [con.MSG] : "Token created successfully",
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
                const token = await tokenModel.findOne(parameter);
                if (token) {
                    return {
                        [con.MSG]: 'Token found successfully',
                        [con.DATA]: token,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no token with ${parameter}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
            let all = await tokenModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Tokens read successfully",
                        [con.DATA] : all,
                        [con.STATUS] : con.OK
                    }
                } else {
                    return {
                        [con.MSG]: "There are no tokens to show",
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
            let one = await tokenModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "Token updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no token with ID = ${id}`,
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
            let one = await tokenModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "Token deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no token with ID = ${id}`,
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