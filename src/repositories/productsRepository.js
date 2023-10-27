import ProductsDTO from "../dao/dto/productsDTO.js";
import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'

export default class ProductsRepository {
    constructor(){
        this.model = new dao[con.PRODUCTS_PERSISTENCE]
    }
    create = async(data) => {
        try {
            data = new ProductsDTO(data)
            let response = await this.model.create(data)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }
    read = async(parameter) => {
        try {
            let response = await this.model.read(parameter)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    update = async(pid, data) => {
        try {
            let response = await this.model.update(pid, data)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    destroy = async(pid) => {
        try {
            let response = await this.model.destroy(pid)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

}





