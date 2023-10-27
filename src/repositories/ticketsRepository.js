import TicketsDTO from "../dao/dto/ticketsDTO.js";
import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'

export default class TicketsRepository {
    constructor(){
        this.model = new dao[con.TICKETS_PERSISTENCE]
    }
    create = async(data) => {
        try {
            data = new TicketsDTO(data)
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