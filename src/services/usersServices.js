import UserDAO from '../daos/userDAO.js';
import * as con from '../../utils/GlobalConstants.mjs';
import bcrypt from 'bcrypt'


const userDAO = new UserDAO(); 

export const getAllUsers = async() => {
    return await userDAO.find()
};

export const getUserById = async(id) => {
    return await userDAO.findById(id)
};

export const getUserByUsername = async(username) => {
    return await userDAO.findByUsername(username)
}

export const createUser = async(user) => {
    const salt = await bcrypt.genSalt(10)
    user[con.PASSWORD] =  await bcrypt.hash(user[con.PASSWORD], salt)
    const newUser  = await userDAO.create(user);
    return newUser.toObject();
}

export const validateUser = async(username, password) => {
    const user = await getUserByUsername(username);
    if(!user){
        return false;
    }

    const isEqual = await bcrypt.compare(password, user[con.PASSWORD])

    return isEqual
    ? user.toObject()
    : false
}

export const recoverUserPassword = async(username, password) => {
    const user = await getUserByUsername(username);
    if(!user) return false;

    const salt = await bcrypt.genSalt(10)
    user[con.PASSWORD] =  await bcrypt.hash(password, salt)
    await user.save()
    return {[con.STATUS]: con.OK}
}




