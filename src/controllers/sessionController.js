import UsersService from '../services/usersServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class SessionController {
    constructor(){
        this.service = new UsersService()
    }
    login = async (req, res) => {
        req.user[con.TOKEN] = req[con.TOKEN]
        try{
            return res.status(200).json({
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
            return res.status(201).json({
                [con.MSG]: "Register Successfully",
                [con.DATA]: user[con.DATA],
                [con.STATUS] : con.OK
            })

        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    requestRecovery = async(req, res, next) => {
        try {
            const data = req.body;
            const response = await this.service.requestRecovery(next, data)
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

    logout = async (req, res) => {
        try{
            return res.status(200).clearCookie(con.TOKEN).json({
                [con.MSG]: "Logout Successfully",
                [con.DATA]: null,
                [con.STATUS] : con.OK
            })
        } catch(error){
            error.from = "controller"
            return next(error)
        }
    }

    changePassword = async (req, res, next) => {
        try{
            const user = req[con.USER]
            const newPassword = {[con.PASSWORD] : req.body[con.PASSWORD]}
            const response = await this.service.update(next, user[con.ID], newPassword)
            return res.status(201).json(response)
        } catch(error){
            error.from = "controller"
            return next(error)
        }
    }

    
}