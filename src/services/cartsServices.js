import * as con from '../utils/GlobalConstants.mjs';
import CartsRepository from '../repositories/cartsRepository.js';
import UsersRepository from '../repositories/usersRepository.js';


export default class CartsService {
    constructor(){
        this.cartRepo = new CartsRepository()
        this.userRepo = new UsersRepository()
    }

    create = async (next, uid) => {
        try{
            let cartResponse = await this.cartRepo.create(next)
            if (cartResponse[con.STATUS] == con.OK){
                await this.userRepo.update(next, uid, {[con.CART] : cartResponse[con.DATA]})
            }
            return cartResponse
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

    read = async (next, cid) => {
        try {
            let response = await this.cartRepo.read(next, cid)
            return response            
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

    update = async (next, cid, data) => {
        try {
            let response = await this.cartRepo.update(next, cid, {[con.PRODUCTS]: data})
            return response
    
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

    destroy = async (next, cid, pid) => {
        try {
            let response = await this.cartRepo.destroy(next, pid)
            return response
        } catch (error) {
            error.from = 'service'
            return next(error)
        }
    }

}

