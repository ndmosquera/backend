import GenericRouter from "../router.js";
import CartsController from "../../controllers/cartsController.js"

let controller = new CartsController();
let { create, read, update, destroy } = controller;

export default class CartsRouter extends GenericRouter {
    init() {
        this.create('/', create)
        this.read('/:cid', read)
        this.create('/:cid/product/:pid', create)
        this.destroy('/:cid/product/:pid', destroy)
        this.update('/:cid', update)
        this.update('/:cid/product/:pid', update)
        this.destroy('/:cid', destroy)
        this.create('/:cid/purchase', create)
    }
}

