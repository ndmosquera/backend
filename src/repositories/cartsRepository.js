import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'
import CartsDTO from "../dao/dto/cartsDTO.js";

export default class CartsRepository {
    constructor(){
        this.model = new dao[con.CARTS_PERSISTENCE]
    }

    create = async(next) => {
        try {
            const data = new CartsDTO({ [con.PRODUCTS]: [] })
            let response = await this.model.create(data)
            return response
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    read = async(next, cid) => {
        try {
            let response = await this.model.read(cid)
            return response
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    update = async(next, id, data) => {
        try {
            let response = await this.model.update(id, data)
            return response            
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    destroy = async(next, id) => {
        try {
            let response = await this.model.destroy(id)
            return response            
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }
}