import GenericRouter from "../router.js";
import TicketsController from "../../controllers/ticketsController.js"

let controller = new TicketsController();
let { create, read, update, destroy } = controller;

export default class TicketsRouter extends GenericRouter {
    init() {
        this.read('/', read)
        this.create('/', create)
        this.read('/:pid', read)
        this.update('/:pid', update)
        this.destroy('/:pid', destroy);
    }
}
