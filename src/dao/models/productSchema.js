import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import * as con from '../../utils/GlobalConstants.mjs'

const productSchema = new mongoose.Schema({
    [con.TITLE]: {
        type : String,
        require : true
        },
    [con.DESCRIPTION]: {
        type: String,
        require : true
        },
    [con.CODE]: {
        type: String,
        require : true
        },
    [con.PRICE]: {
        type: Number,
        require : true
        },
    [con.STATUS]: {
        type: Boolean
        },
    [con.STOCK]: {
        type: Number,
        require : true
        },
    [con.CATEGORY]: {
        type: String,
        require : true
        },
    [con.THUMBNAIL]: {
        type: String
        },
    [con.OWNER] : {
        type : mongoose.Schema.Types.ObjectId,
        ref : con.USERS,
    }
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(con.PRODUCTS, productSchema)

export default productModel; 