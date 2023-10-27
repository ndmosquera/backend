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

cartSchema.pre("find", function () {
    this.populate(con.PRODUCTS + '.' + con.ID);
  });
  
  cartSchema.pre("findOne", function () {
    this.populate(con.PRODUCTS + '.' + con.ID);
  });
  
  cartSchema.pre("findOneAndUpdate", function () {
    this.populate(con.PRODUCTS + '.' + con.ID);
  });

const cartModel = mongoose.model(con.CARTS, cartSchema)

export default cartModel;  