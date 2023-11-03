import ProductsDTO from "../dao/dto/productsDTO.js";
import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'

export default class ProductsRepository {
    constructor(){
        this.model = new dao[con.PRODUCTS_PERSISTENCE]
    }
    create = async(next, data) => {
        try {
            data = new ProductsDTO(data)
            let response = await this.model.create(data)
            return response
        } catch (error) {
            error.from = 'repository'
            next(error)
        }
    }
    read = async(next, filter, limit, page, sort) => {
        try {
            let response = await this.model.read(filter, limit, page, sort)
            return response
        } catch (error) {
            error.from = 'repository'
            next(error)
        }
    }

    update = async(next, pid, data) => {
        try {
            let response = await this.model.update(pid, data)
            return response            
        } catch (error) {
            error.from = 'repository'
            next(error)
        }
    }

    destroy = async(next, pid) => {
        try {
            let response = await this.model.destroy(pid)
            return response            
        } catch (error) {
            error.from = 'repository'
            next(error)
        }
    }

}





