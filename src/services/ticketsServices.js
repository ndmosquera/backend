import * as con from '../utils/GlobalConstants.mjs';
import TicketsRepository from '../repositories/ticketsRepository.js';


export default class TicketsService {
    constructor() {
        this.repository = new TicketsRepository()
    }
    create = async (data) => {
        try {
            let response = await this.repository.create(data)
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    read = async (pid) => {
        try {
            let response = await this.repository.read(pid)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }

    }
    update = async (pid, data) => {
        try {
            let response = await this.repository.update(pid, data)
            return response            
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }
    
    destroy = async (pid) => {
        try {
            let response = await this.repository.destroy(pid)
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
