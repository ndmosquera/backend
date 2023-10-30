import UsersService from '../services/usersServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class UsersController {
    constructor(){
        this.service = new UsersService()
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            let response = await this.service.create(data)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.read(pid)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { pid } = req.params; 
            const data = req.body;
            let response = await this.service.update(pid, data)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.destroy(pid)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    changePremium = async (req, res, next) => {
        try {
            pid = req.body
            let user = await this.service.read({[con.ID]: pid})
            user = user[con.DATA]
            let response
            switch(user[con.ROLE]){
                case con.USER:
                    response = await this.service.update({[con.ID]: pid}, {[con.ROLE]: con.PREMIUM})
                    break
                case con.PREMIUM:
                    response = await this.service.update({[con.ID]: pid}, {[con.ROLE]: con.USER})
                  break
            default:
                response = {
                    [con.MSG] : "The user role is neither USER not PREMIUM",
                    [con.DATA]: null,
                    [con.STATUS] : con.ERROR
                }
            }

            return res.json(response)
        } catch (error) {
            next(error)
        }
    }
}