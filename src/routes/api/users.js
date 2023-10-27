import GenericRouter from "../router.js";
import UsersController from "../../controllers/usersController.js"

let controller = new UsersController();
let { create, read, update, destroy } = controller;

export default class UsersRouter extends GenericRouter {
    init() {
        this.read('/', read)
        this.create('/', create)
        this.read('/:pid', read)
        this.update('/:pid', update)
        this.destroy('/:pid', destroy);
    }
}


