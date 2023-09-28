import userModel from "../models/userSchema.js";
import * as con from "../../utils/GlobalConstants.mjs"

export default class UserDAO {
  constructor() {}

  find = async () => {
    return await userModel.find();
  };

  findById = async (id) => {
    return await userModel.findById(id);
  };

  findByUsername = async (username) => {
    return await userModel.findOne({ [con.USERNAME]: username });
  };

  create = async (newUser) => {
    return await userModel.create(newUser);
  };
}
