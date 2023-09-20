import mongoose from "mongoose";
import * as con from "../../utils/GlobalConstants.mjs"

const cartSchema = new mongoose.Schema({
    [con.PRODUCTS] : {
        type : [
            {
            [con.ID] : {
                type : mongoose.Schema.Types.ObjectId,
                ref : con.PRODUCTS
                },
            [con.QUANTITY] : Number
            }
        ],
        default : []
    }
})


const cartModel = mongoose.model(con.CARTS, cartSchema)

export default cartModel;  