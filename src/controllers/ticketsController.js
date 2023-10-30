import TicketsService from '../services/ticketsServices.js'

export default class TicketsController {
    constructor(){
        this.service = new TicketsService()
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
}