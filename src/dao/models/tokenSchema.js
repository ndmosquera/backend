import mongoose from "mongoose";
import * as con from "../../utils/GlobalConstants.mjs"

const tokenSchema = new mongoose.Schema({
  [con.TOKEN]: {
    type: String,
    required: true,
  },
  [con.TOKEN_TIME]: {
    type: Date,
    default : Date.now
    },
  [con.EMAIL]: {
    type: String,
    require: true,
    unique: true,
  },
});



const tokenModel = mongoose.model(con.TOKEN, tokenSchema);

export default tokenModel;