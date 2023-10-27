import ProductsService from '../services/productsServices.js'

export default class ProductsController {
    constructor(){
        this.service = new ProductsService()
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
            const { query } = req.params;
            let response = await this.service.read(query)
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