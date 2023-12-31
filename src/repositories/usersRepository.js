import UsersDTO from "../dao/dto/usersDTO.js";
import dao from "../dao/factory.js";
import * as con from '../utils/GlobalConstants.mjs'

export default class UsersRepository {
    constructor(){
        this.model = new dao[con.USERS_PERSISTENCE]
    }
    create = async(next, data) => {
        try {
            data = new UsersDTO(data)
            let response = await this.model.create(next, data)
            return response
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }
    read = async(next, parameter = null) => {
        try {
            let response = await this.model.read(next, parameter)
            return response
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    update = async(next, uid, data) => {
        try {
            let response = await this.model.update(next, {[con.ID]: uid}, data)
            return response            
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    destroy = async(next, id) => {
        try {
            let response = await this.model.destroy(next, id)
            return response            
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

    updatePassword = async(next, username, newPassword) => {
        try {
            let response = await this.model.update({[con.USERNAME]: username}, {[con.PASSWORD]: newPassword})
            return response            
        } catch (error) {
            error.from = 'repository'
            return next(error)
        }
    }

}