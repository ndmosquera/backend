import UsersService from '../services/usersServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class SessionController {
    constructor(){
        this.service = new UsersService()
    }
    login = async (req, res) => {
        try{
            return res.status(200).cookie('token', req[con.TOKEN], { maxAge: 60 * 60 * 1000 }).json({
                [con.MSG]: "Login Successfully",
                [con.DATA]: req.user,
                [con.STATUS] : con.OK
            })
        } catch(error){
            error.from = "controller"
            return next(error)
        }
    }

    register = async (req, res, next) => {
        try {
            const data = req.body;
            const user = await this.service.create(next, data)
            return res.status(201).json(user[con.DATA][con.ID])

        } catch (error) {
            error.from = 'controller'
            return next(error)
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