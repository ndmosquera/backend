import TicketsService from '../services/ticketsServices.js'
import * as con from '../utils/GlobalConstants.mjs'

export default class TicketsController {
    constructor(){
        this.service = new TicketsService()
    }
    create = async (req, res, next) => {
        try {
            const user = req[con.USER];
            let response = await this.service.create(next, user)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const user = req[con.USER];
            let response = await this.service.read(next, user)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { pid } = req.params; 
            const data = req.body;
            let response = await this.service.update(next, pid, data)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;
            let response = await this.service.destroy(next, pid)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}