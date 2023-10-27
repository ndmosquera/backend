import * as con from '../utils/GlobalConstants.mjs';
import ProductsRepository from '../repositories/productsRepository.js';


export default class ProductsService {
    constructor() {
        this.repository = new ProductsRepository()
    }
    create = async (data) => {
        try {
            data[con.STATUS] = data.hasOwnProperty(con.STATUS) ? data[con.STATUS] : true;

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

    read = async (query) => {
        try {
            const parameter = query ? JSON.parse(query) : undefined;
            let response = await this.repository.read(parameter)
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
