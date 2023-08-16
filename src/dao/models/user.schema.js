import mongoose from "mongoose";
import * as con from "../../../utils/GlobalConstants.mjs"

const schema = new mongoose.Schema({
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
  [con.PASSWORD]: {
    type: String,
    required: true,
  },
  [con.AVATAR]: {
    type: String,
  },
  [con.SALT]: {
    type: String,
    required: true,
  }
});



const UserModel = mongoose.model("user", schema);
export default UserModel;