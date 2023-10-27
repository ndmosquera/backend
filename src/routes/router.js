import { Router } from "express";
import * as con from '../utils/GlobalConstants.mjs'

export default class GenericRouter {
    constructor () {
        this.router = Router() 
        this.init()
    }
    init() {}
    getRouter = () => this.router
    applyMids = (mids) =>{
        return mids.map(mid => async(...params) =>{
            try {
                await mid.apply(this,params)
            } catch (error) { 
                return params[1].status(500).send(con.ERROR)
            }
        })
    }
    create = (path, ...cbs) => this.router.post(path, this.applyMids(cbs))
    read = (path, ...cbs) => this.router.get(path, this.applyMids(cbs))
    update = (path, ...cbs) => this.router.put(path, this.applyMids(cbs))
    destroy = (path, ...cbs) => this.router.delete(path, this.applyMids(cbs))
    use = (path, ...cbs) => this.router.use(path, this.applyMids(cbs))
}