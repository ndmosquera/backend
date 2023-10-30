import CartsService from '../services/cartsServices.js'

export default class CartsController {
    constructor(){
        this.service = new CartsService()
    }
    create = async (req, res, next) => {
        try {
            const uid = req.body
            let response = await this.service.create(uid)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    addProductsToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            let response = await this.service.addProductToCart(cid, pid)
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
}