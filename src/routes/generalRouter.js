import GenericRouter from "./router.js";
import CartsRouter from "./api/carts.js";
import ProductsRouter from "./api/products.js";
import UsersRouter from "./api/users.js";
import TicketsRouter from "./api/tickets.js";
import AuthRouter from "./api/authentication.js";

let products = new ProductsRouter()
products = products.getRouter()

let carts = new CartsRouter()
carts = carts.getRouter()

let users = new UsersRouter()
users = users.getRouter()

let tickets = new TicketsRouter()
tickets = tickets.getRouter()

let auth = new AuthRouter()
auth = auth.getRouter()


export default class GeneralApiRouter extends GenericRouter {
    init() {
        this.use('/auth', auth)
        this.use('/products', products)
        this.use('/carts', carts)
        this.use('/users', users)
        this.use('/tickets', tickets)
    }
}