import ENV from '../config/env.js'
import { connect } from 'mongoose'
import * as con from '../utils/GlobalConstants.mjs'

let dao = {}

switch (ENV.NODE_ENV) {
    case "development":
        console.log("Connected to FS")
        const { default: ProductsFS } = await import("./fs/productsFS.js")
        const { default: CartsFS } = await import("./fs/cartsFS.js")
        const { default: TicketsFS } = await import("./fs/ticketsFS.js")
        const { default: UsersFS } = await import("./fs/usersFS.js")
        dao = {
            [con.PRODUCTS_PERSISTENCE] : ProductsFS,
            [con.CARTS_PERSISTENCE] : CartsFS,
            [con.TICKETS_PERSISTENCE] : TicketsFS,
            [con.USERS_PERSISTENCE] : UsersFS
        }
        break;
    default:
        await connect(ENV.LINK_DB).then(() => console.log("Connected to MongoDB"))
        const { default: ProductsMongo } = await import("./mongo/productsMongo.js")
        const { default: CartsMongo } = await import("./mongo/cartsMongo.js")
        const { default: TicketsMongo } = await import("./mongo/ticketsMongo.js")
        const { default: UsersMongo } = await import("./mongo/usersMongo.js")
        dao = {
            [con.PRODUCTS_PERSISTENCE] : ProductsMongo,
            [con.CARTS_PERSISTENCE] : CartsMongo,
            [con.TICKETS_PERSISTENCE] : TicketsMongo,
            [con.USERS_PERSISTENCE] : UsersMongo
        }
        break;
}

export default dao