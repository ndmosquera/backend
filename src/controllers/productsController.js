import ProductsService from '../services/productsServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class ProductsController {
    constructor(){
        this.service = new ProductsService()
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            data[con.OWNER] = req[con.USER][con.USERNAME]
            let response = await this.service.create(next, data)
            return res.status(201).json(response)
        } catch (error) {
            error.from = "controller"
            return next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const parameters = req.query
            let response = await this.service.read(next, parameters)
            return res.status(201).json(response)
        } catch (error) {
            error.from = "controller"
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
            error.from = "controller"
            return next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.destroy(next, pid)
            return res.status(201).json(response)
        } catch (error) {
            error.from = "controller"
            return next(error)
        }
    }
}