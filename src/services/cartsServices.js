import * as con from '../utils/GlobalConstants.mjs';
import ProductsRepository from '../repositories/productsRepository.js';
import CartsRepository from '../repositories/cartsRepository.js';
import UsersRepository from '../repositories/usersRepository.js';

export default class CartsService {
    constructor(){
        this.productRepo = new ProductsRepository()
        this.cartRepo = new CartsRepository()
        this.userRepo = new UsersRepository()
    }

    create = async () => {
        try{
            let response = await this.cartRepo.create()
            return response
        } catch (error) {
            return {
                [con.MSG] : error.message,
                [con.DATA] : `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR 
            }
        }
    }

    addProductToCart = async (cid, pid) => {
        const cartResponse = await this.cartRepo.read({[con.ID] : cid})
        const productResponse = await this.productRepo.read({[con.ID] : pid})
        if(cartResponse[con.STATUS] == con.OK){
            const cart = cartResponse[con.DATA]
        }
        if(productResponse[con.STATUS] == con.OK){
            const product = productResponse[con.DATA]
        }
    }

    read = async (pid) => {
        try {
            let response = await this.cartRepo.read(pid)
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
            let response = await this.cartRepo.update(pid, data)
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
            let response = await this.cartRepo.destroy(pid)
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

