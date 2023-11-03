import GenericRouter from "../router.js";
import ProductsController from "../../controllers/productsController.js"

// Middlewares
import { isAdminOrPremium } from "../../middlewares/users.js";
import { areValidProductsFields } from "../../middlewares/products.js";


let controller = new ProductsController();
let { create, read, update, destroy } = controller;

export default class ProductsRouter extends GenericRouter {
    init() {
        this.create('/', isAdminOrPremium, areValidProductsFields, create)    
        this.read('/', read)
        this.update('/:pid', isAdminOrPremium, update)
        this.destroy('/:pid', isAdminOrPremium, destroy);
    }
}
