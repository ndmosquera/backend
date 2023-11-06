import * as con from '../utils/GlobalConstants.mjs';
import TicketsRepository from '../repositories/ticketsRepository.js';
import CartsRepository from '../repositories/cartsRepository.js';
import ProductsRepository from '../repositories/productsRepository.js';
import { liquidateCart } from '../utils/cartsFunctions.js';

export default class TicketsService {
    constructor() {
        this.repository = new TicketsRepository()
        this.cartsRepo = new CartsRepository()
        this.productsRepo = new ProductsRepository()

    }
    create = async (next, user) => {
        try {
            let cart = await this.cartsRepo.read(next, user[con.CART])
            cart = cart[con.DATA]
            const productIds = cart.map((item) => item[con.ID]);
            
            const products = []
            for (const pid of productIds){
                const product = await this.productsRepo.read(next, {[con.ID]:pid})
                products.push(product[con.DATA][0])
            }
            const data = liquidateCart(user, cart, products)

            let response = await this.repository.create(data)
            return response
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }

    read = async (next, user) => {
        try {
            let cart = await this.cartsRepo.read(next, user[con.CART])
            cart = cart[con.DATA]
            const productIds = cart.map((item) => item[con.ID]);
            
            const products = []
            for (const pid of productIds){
                const product = await this.productsRepo.read(next, {[con.ID]:pid})
                products.push(product[con.DATA][0])
            }
            const data = liquidateCart(user, cart, products)

            let response = {
                [con.MSG] : "Ticket Info",
                [con.STATUS] : con.OK,
                [con.DATA] : data}
            return response            
        } catch (error) {
            error.from = "service"
            return next(error)
        }

    }
    update = async (pid, data) => {
        try {
            let response = await this.repository.update(pid, data)
            return response            
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }
    
    destroy = async (pid) => {
        try {
            let response = await this.repository.destroy(pid)
            return response
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }
}
