import UsersDTO from "../dao/dto/usersDTO.js";
import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'

export default class UsersRepository {
    constructor(){
        this.model = new dao[con.USERS_PERSISTENCE]
    }
    create = async(data) => {
        try {
            data = new UsersDTO(data)
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
    read = async(parameter = null) => {
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