import mongoose from "mongoose";
import * as con from "../../../utils/GlobalConstants.mjs"

const userSchema = new mongoose.Schema({
  [con.NAME]: {
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
  },
  [con.PASSWORD]: {
    type: String,
    required: true,
  },
  [con.AVATAR]: {
    type: String,
  },
  [con.ROLE]: {
    type: String,
    enum: [con.ADMIN, con.USER],
    default: con.USER
  }
});

const userModel = mongoose.model(con.USERS, userSchema);

export default userModel;