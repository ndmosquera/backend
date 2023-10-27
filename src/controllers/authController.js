import jwt from "jsonwebtoken"
import UsersService from '../services/usersServices.js'
import ENV from '../config/env.js'
import bcrypt from 'bcrypt'
import * as con from '../utils/GlobalConstants.mjs'

export default class AuthController {
    constructor(){
        this.service = new UsersService()
    }
    login = async (req, res) => {
        const user = req.user
        delete user[con.PASSWORD]
        res.json({
            [con.MSG]: "Login Successfully",
            [con.DATA]: user,
            [con.STATUS] : con.OK


        })}

    register = async (req, res, next) => {
        try {
            const data = req.body;
            const user = await this.service.create(data)
            return res.status(201).json(user)

        } catch (error) {
            next(error)
        }
    }


    
}