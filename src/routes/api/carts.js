import GenericRouter from "../router.js";
import CartsController from "../../controllers/cartsController.js"
import { isUser } from "../../middlewares/users.js";
import { validatedUpdateCart } from "../../middlewares/carts.js";

let controller = new CartsController();
let { create, read, update, destroy } = controller;

export default class CartsRouter extends GenericRouter {
    init() {
        this.create('/', isUser, create)
        this.read('/', isUser, read)
        this.update('/:pid', isUser, validatedUpdateCart, update)

    }
}

