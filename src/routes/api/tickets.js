import GenericRouter from "../router.js";
import TicketsController from "../../controllers/ticketsController.js"
import { isUser } from "../../middlewares/users.js";

let controller = new TicketsController();
let { create, read } = controller;

export default class TicketsRouter extends GenericRouter {
    init() {
        this.create('/', isUser, create)
        this.read('/', isUser, read)
    }
}
