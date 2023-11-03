import GenericRouter from "./router.js";
import ProductsRouter from "./api/products.js";
import CartsRouter from "./api/carts.js";
import UsersRouter from "./api/users.js";
import TicketsRouter from "./api/tickets.js";
import SessionRouter from "./api/sessions.js";

let products = new ProductsRouter()
products = products.getRouter()

let carts = new CartsRouter()
carts = carts.getRouter()

let users = new UsersRouter()
users = users.getRouter()

let tickets = new TicketsRouter()
tickets = tickets.getRouter()

let session = new SessionRouter()
session = session.getRouter()


export default class GeneralApiRouter extends GenericRouter {
    init() {
        this.use('/products', products)
        this.use('/session', session)
        this.use('/carts', carts)
        this.use('/users', users)
        this.use('/tickets', tickets)
    }
}