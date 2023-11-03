import CartsService from '../services/cartsServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class CartsController {
    constructor(){
        this.service = new CartsService()
    }
    create = async (req, res, next) => {
        try {
            const uid = req[con.USER][con.ID]
            let response = await this.service.create(next, uid)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const cid = req[con.USER][con.CART]
            let response = await this.service.read(next, cid)
            return res.status(201).json(response)
        } catch (error) {
            error.from = 'controller'
            return next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const cid = req[con.USER][con.CART]
            const data = req[con.DATA]
            let response = await this.service.update(next, cid, data)
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
}