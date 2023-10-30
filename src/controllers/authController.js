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

    requestRecovery = async(req, res, next) => {
        try {
            const data = req.body;
            const response = await this.service.requestRecovery(data)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    validateRecoveryToken = async(req, res, next) => {
        try {
            const token = req.query[con.TOKEN];
            const response = await this.service.validateRecoveryToken(token)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
    
    passwordRestore = async(req, res, next) => {
        try {
            const token = req.query[con.TOKEN];
            const newPassword = req.body;
            const validatedRecoveryToken = await this.service.validateRecoveryToken(token)
            if (validatedRecoveryToken[con.STATUS] === con.OK){
                const response = await this.service.passwordRestore(token, newPassword)
                return res.status(201).json(response)
            } else {
                return res.status(400).send("Vuelva a intentarlo")
            }
            
        } catch (error) {
            next(error)
        }
    }

    
}