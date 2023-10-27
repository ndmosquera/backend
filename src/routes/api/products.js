import GenericRouter from "../router.js";
import ProductsController from "../../controllers/productsController.js"

let controller = new ProductsController();
let { create, read, update, destroy } = controller;

export default class ProductsRouter extends GenericRouter {
    init() {
        this.read('/', read)
        this.create('/', create)
        this.read('/:query', read)
        this.update('/:pid', update)
        this.destroy('/:pid', destroy);
    }
}
