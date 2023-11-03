import userModel from "../models/userSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'
import CustomError from "../../utils/customError.js";

export default class UsersMongo {
    constructor(){}

    create = async (next, data) => {
        try {
            let one = await userModel.create(data)
            return {
                [con.MSG] : "User created successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            }
        } catch (error) {
            error.from = 'mongo'
            return next(error)
        }
    }


    read = async (next, parameter = null) => {
        try {
            if(parameter){
                const user = await userModel.findOne(parameter);
                if (user) {
                    return {
                        [con.MSG]: 'User found successfully',
                        [con.DATA]: user,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    CustomError(con.ErrorDict.notFoundOne)
                }
            } else {
            let all = await userModel.find();
                if(all.length > 0){
                    return {
                        [con.MSG] : "Users read successfully",
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

    update = async (next, param, data) => {
        try {
            let one = await userModel.findOneAndUpdate(param, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "User updated successfully",
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

    destroy = async (next, id) => {
        try {
            let one = await userModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "User deleted successfully",
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