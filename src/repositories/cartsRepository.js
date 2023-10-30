import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'
import CartsDTO from "../dao/dto/cartsDTO.js";

export default class CartsRepository {
    constructor(){
        this.model = new dao[con.CARTS_PERSISTENCE]
    }

    create = async() => {
        try {
            data = new CartsDTO({})
            console.log(data)
            let response = await this.model.create()
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    read = async(id = null) => {
        try {
            let response = await this.model.read(id)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    update = async(id, data) => {
        try {
            let response = await this.model.update(id, data)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    destroy = async(id) => {
        try {
            let response = await this.model.destroy(id)
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