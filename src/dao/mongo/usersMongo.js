import userModel from "../models/userSchema.js";
import * as con from '../../utils/GlobalConstants.mjs'

export default class UsersMongo {
    constructor(){}

    create = async (data) => {
        try {
            let one = await userModel.create(data)
            return {
                [con.MSG] : "User created successfully",
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
                const user = await userModel.findOne(parameter);
                if (user) {
                    return {
                        [con.MSG]: 'User found successfully',
                        [con.DATA]: user,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no user with ${parameter}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
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
                    return {
                        [con.MSG]: "There are no users to show",
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
            let one = await userModel.findByIdAndUpdate(id, data, {new : true})
            if(one){
                return {
                    [con.MSG] : "User updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no user with ID = ${id}`,
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
            let one = await userModel.findByIdAndDelete(id)
            if (one){
                return {
                    [con.MSG] : "User deleted successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                }
            } else {
                return {
                    [con.MSG] : `There is no user with ID = ${id}`,
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