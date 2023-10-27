import mongoose from "mongoose";
import * as con from "../../utils/GlobalConstants.mjs"

const userSchema = new mongoose.Schema({
  [con.FIRST_NAME]: {
    type: String,
    required: true,
  },
  [con.LAST_NAME]: {
    type: String,
    required: true,
  },
  [con.USERNAME]: {
    type: String,
    required: true,
  },
  [con.EMAIL]: {
    type: String,
    default: "",
    unique: true,
  },
  [con.AGE]: {
    type: Number,
  },
  [con.PASSWORD]: {
    type: String,
    required: true,
  },
  [con.AVATAR]: {
    type: String,
  },
  [con.CART] : {
    type : mongoose.Schema.Types.ObjectId,
    ref : con.CARTS,
  },
  [con.ROLE]: {
    type: String,
    enum: [con.ADMIN, con.USER],
    default: con.USER
  }
});

userSchema.pre("find", function () {
  this.populate(con.CART);
});

userSchema.pre("findOne", function () {
  this.populate(con.CART);
});

const userModel = mongoose.model(con.USERS, userSchema);

export default userModel;