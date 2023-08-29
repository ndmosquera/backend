import userModel from '../models/user.schema.js';
import * as con from '../../../utils/GlobalConstants.mjs';
import bcrypt from 'bcrypt'

class UserManager {
    constructor() {}

    async getUsers(){
        const users = await userModel.find();
        return users
    }

    async createUser(user) {
        const salt = await bcrypt.genSalt(10)
        user[con.PASSWORD] =  await bcrypt.hash(user[con.PASSWORD], salt)
        const newUser  = await userModel.create(user);
        return newUser.toObject();
    }

    async getUserByUsername(username){
        return await userModel.findOne({ username })
    }

    async getUserById(id){
        return await userModel.findById(id)
    }

    async validateUser(username, password){
        const user = await this.getUserByUsername(username);
        if(!user){
            return false;
        }

        const isEqual = await bcrypt.compare(password, user[con.PASSWORD])

        return isEqual
        ? user.toObject()
        : false
    }

    async recoverUserPassword(username, password){
        const user = await this.getUserByUsername(username);
        if(!user) return false;

        const salt = await bcrypt.genSalt(10)
        user[con.PASSWORD] =  await bcrypt.hash(password, salt)
        await user.save()
        return {[con.STATUS]: con.OK}
    }



}

export default UserManager