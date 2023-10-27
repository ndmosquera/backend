import bcrypt from 'bcrypt'
import * as con from './GlobalConstants.mjs'
import UsersService from '../services/usersServices.js';

const usersService = new UsersService()

export const validateUser = async(username, password) => {
    const response = await usersService.read({[con.USERNAME] : username});
    if(response[con.STATUS] === con.ERROR){
        return false;
    }
    const user = response[con.DATA]

    const isEqual = await bcrypt.compare(password, user[con.PASSWORD])

    return isEqual
    ? user
    : false
}