import GenericRouter from "../router.js";
import UsersController from "../../controllers/usersController.js"
import { isLogged } from "../../middlewares/users.js";

let controller = new UsersController();
let { create, read, update, destroy, changePremium } = controller;

export default class UsersRouter extends GenericRouter {
    init() {
        this.read('/', read)
        this.create('/', create)
        this.read('/:pid', read)
        this.update('/:pid', update)
        this.destroy('/:pid', destroy);
        this.create('/premium', isLogged, changePremium)
    }
}


