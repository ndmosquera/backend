import mongoose from "mongoose";
import * as con from '../../utils/GlobalConstants.mjs'

const ticketSchema = new mongoose.Schema({
    [con.CODE]: {
        type : String,
        unique: true,
        require : true
        },
    [con.PURCHASE_DATETIME]: {
        type: Date,
        default : Date.now
        },
    [con.AMOUNT]: {
        type: Number,
        require : true
        },
    [con.PURCHASER]: {
        type: String,
        require : true
        },
    [con.PURCHASE]:{
        type : [
            {
            [con.ID] : {
                type : mongoose.Schema.Types.ObjectId,
                ref : con.PRODUCTS
                },
            [con.QUANTITY] : Number
            }
        ]
    }
})

const ticketModel = mongoose.model(con.TICKET, ticketSchema)

export default ticketModel; 