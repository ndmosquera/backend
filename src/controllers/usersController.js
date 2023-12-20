import UsersService from '../services/usersServices.js'
import * as con from '../utils/GlobalConstants.mjs'
import CustomError from '../utils/customError.js';

export default class UsersController {
    constructor(){
        this.service = new UsersService()
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            let response = await this.service.create(next, data)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.read(next, pid)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { pid } = req.params; 
            const data = req.body;
            let response = await this.service.update(next, pid, data)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.destroy(next, pid)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    changePremium = async (req, res, next) => {
        try {
            let user = req[con.USER]
            let response
            switch(user[con.ROLE]){
                case con.USER:
                    response = await this.service.updateRole(next, user[con.ID], {[con.ROLE]: con.PREMIUM})
                    break
                case con.PREMIUM:
                    response = await this.service.updateRole(next, {[con.ID]: pid}, {[con.ROLE]: con.USER})
                  break
            default:
                CustomError(con.ErrorDict.badRequest)
            }
            return res.json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }
}