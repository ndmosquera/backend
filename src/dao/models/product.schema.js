import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'
import * as con from "../../../utils/GlobalConstants.mjs"

const productSchema = new mongoose.Schema({
    [con.PRODUCT_TITLE]: {
        type : String,
        require : true
        },
    [con.PRODUCT_DESCRIPTION]: {
        type: String,
        require : true
        },
    [con.PRODUCT_CODE]: {
        type: String,
        require : true
        },
    [con.PRODUCT_PRICE]: {
        type: Number,
        require : true
        },
    [con.PRODUCT_STATUS]: {
        type: Boolean
        },
    [con.PRODUCT_STOCK]: {
        type: Number,
        require : true
        },
    [con.PRODUCT_CATEGORY]: {
        type: String,
        require : true
        },
    [con.PRODUCT_THUMBNAIL]: {
        type: String
        }
})

productSchema.plugin(moongosePaginate)

const productModel = mongoose.model(con.PRODUCTS, productSchema)

export default productModel; 