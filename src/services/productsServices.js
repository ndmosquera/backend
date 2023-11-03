import * as con from '../utils/GlobalConstants.mjs';
import ProductsRepository from '../repositories/productsRepository.js';


export default class ProductsService {
    constructor() {
        this.repository = new ProductsRepository()
    }
    create = async (next, data) => {
        try {
            data[con.STATUS] = data.hasOwnProperty(con.STATUS) ? data[con.STATUS] : true;

            let response = await this.repository.create(next, data)
            return response
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }

    read = async (next, parameters) => {
        try {
            const { limit=10, page=1, query=undefined, sort='asc' } = parameters

            const filter = {};
            if (query) {
                const queries = query.split(",");
                queries.forEach(q => {
                    const [key, value] = q.split(":");
                    filter[key] = value;
                })
            }
            let response = await this.repository.read(next, filter, Number(limit), Number(page), sort)
            return response            
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }

    update = async (next, pid, data) => {
        try {
            let response = await this.repository.update(next, pid, data)
            return response            
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }
    
    destroy = async (next, pid) => {
        try {
            let response = await this.repository.destroy(next, pid)
            return response
        } catch (error) {
            error.from = "service"
            return next(error)
        }
    }
}
